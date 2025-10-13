package aid

import (
	"fmt"
	"os"
	"os/signal"
	"regexp"
	"strconv"
	"syscall"

	"github.com/goccy/go-json"
)

func WaitForExit() {
	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc
}

func FormatNumber(number int) string {
	str := ""
	for i, char := range ReverseString(strconv.Itoa(number)) {
		if i % 3 == 0 && i != 0 {
			str += ","
		}
		str += string(char)
	}

	return ReverseString(str)
}

func FormatPrice(number int) string {
	last := number % 100
	number /= 100
	str := fmt.Sprintf("%d.%02d", number, last)
	return str
}

func ReverseString(input string) string {
	str := ""
	for _, char := range input {
		str = string(char) + str
	}
	return str
}

func ToHex(number int) string {
	inta := strconv.FormatInt(int64(number), 16)
	
	if len(inta) == 1 {
		return "0" + inta
	}
	
	return inta
}

func Regex(str, regex string) *string {
	reg := regexp.MustCompile(regex).FindStringSubmatch(str)
	if len(reg) > 1 {
		return &reg[1]
	}

	return nil
}

// if condition is true, return a, else return b
func Ternary[T any](condition bool, a, b T) T {
	if condition {
		return a
	}
	return b
}

func ToInt(str string) int {
	i, _ := strconv.Atoi(str)
	return i
}

func Flatten[T any](arr [][]T) []T {
	var flat []T
	for _, a := range arr {
		flat = append(flat, a...)
	}
	return flat
}

func StructToBytes[T any](s T) []byte {
	b, err := json.Marshal(s)
	if err != nil {
		panic(err)
	}
	return b
}

func BytesToStruct[T any](b []byte) T {
	var s T
	
	err := json.Unmarshal(b, &s)
	if err != nil {
		panic(err)
	}

	return s
}


// nice string takes in a single string with no spaces and adds spaces behin a capital letter
func NiceString(str string) string {
	newStr := ""
	for _, char := range str {
		if char >= 'A' && char <= 'Z' {
			newStr += " "
		}
		newStr += string(char)
	}
	return newStr
}

func StripEverythingButLetters(str string) string {
	newStr := ""
	for _, char := range str {
		if (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') {
			newStr += string(char)
		}
	}
	return newStr
}

func Map[S ~[]E, E any, T any](s S, f func(E) T) []T {
	result := make([]T, len(s))
	for i, v := range s {
		result[i] = f(v)
	}
	return result
}