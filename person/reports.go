package person

import (
	"sync"

	"github.com/ectrc/snow/storage"
	"github.com/google/uuid"
)

type ReportTypeEnum int
const ReportTypeEnumIncoming ReportTypeEnum = 0
const ReportTypeEnumOutgoing ReportTypeEnum = 1

type Report struct {
	ID string
	ReporterID string
	OffenderID string
	Reason string
	Details string
	SessionID string
	PlaylistName string
	Type ReportTypeEnum
}

func NewReport(offender *Person, reporter *Person, reason, details, playlistName string) *Report {
	return &Report{
		ID: uuid.NewString(),
		OffenderID: offender.ID,
		Reason: reason,
		Details: details,
		PlaylistName: playlistName,
		ReporterID: reporter.ID,
	}
}

func (r *Report) ToDatabase() *storage.DB_Report {
	return &storage.DB_Report{
		ID: r.ID,
		ReporterID: r.ReporterID,
		OffenderID: r.OffenderID,
		Reason: r.Reason,
		Details: r.Details,
		SessionID: r.SessionID,
		PlaylistName: r.PlaylistName,
	}
}

func (r *Report) Delete() {
	storage.Repo.DeleteReport(r.ID)
}

func FromDatabaseReport(dbReport *storage.DB_Report) *Report {
	return &Report{
		ID: dbReport.ID,
		ReporterID: dbReport.ReporterID,
		OffenderID: dbReport.OffenderID,
		Reason: dbReport.Reason,
		Details: dbReport.Details,
		SessionID: dbReport.SessionID,
		PlaylistName: dbReport.PlaylistName,
	}
}

type ReportMutex struct {
	sync.Map
	PersonID	 string
}

func NewReportMutex(personID string) *ReportMutex {
	return &ReportMutex{
		PersonID: personID,
	}
}

func (m *ReportMutex) AddReport(report *Report) *Report {
	if report.ReporterID != m.PersonID && report.OffenderID == m.PersonID {
		report.Type = ReportTypeEnumIncoming
	} else if report.ReporterID == m.PersonID && report.OffenderID != m.PersonID {
		report.Type = ReportTypeEnumOutgoing
	} else {
		return nil
	}
	m.Store(report.ID, report)
	storage.Repo.SaveReport(report.ToDatabase())
	return report
}

func (m *ReportMutex) DeleteReport(id string) {
	report := m.GetReport(id)
	if report == nil {
		return
	}

	m.Delete(id)
	report.Delete()
}

func (m *ReportMutex) GetReport(id string) *Report {
	report, ok := m.Load(id)
	if !ok {
		return nil
	}

	return report.(*Report)
}

func (m *ReportMutex) RangeReports(f func(key string, value *Report) bool) {
	m.Range(func(key, value interface{}) bool {
		return f(key.(string), value.(*Report))
	})
}

func (m *ReportMutex) Count() int {
	count := 0
	m.Range(func(key, value interface{}) bool {
		count++
		return true
	})
	return count
}