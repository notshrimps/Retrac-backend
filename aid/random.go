package aid

import (
	"math/rand"
)

var Random *rand.Rand

func SetRandom(r *rand.Rand) {
	Random = r
}

func SnowRandomString(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	s := make([]rune, n)
	for i := range s {
 		s[i] = letters[Random.Intn(len(letters))]
	}

	return string(s)
}

func RandomString(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	s := make([]rune, n)
	for i := range s {
 		s[i] = letters[rand.Intn(len(letters))]
	}

	return string(s)
}

func SnowRandomInt(min, max int) int {
	if Random == nil {
		Random = rand.New(rand.NewSource(0))
	}
	return Random.Intn(max-min) + min
}
