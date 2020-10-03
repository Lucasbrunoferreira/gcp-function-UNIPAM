package p

import (
  "encoding/json"
  "fmt"
  "html"
  "net/http"
)

func CreateCars(w http.ResponseWriter, r *http.Request) {

  var car struct {
    Plaque string `json:"plaque"`
    Color string `json:"color"`
    Price string `json:"price"`
    CarModel string `json:"carModel"`
    Brand string `json:"brand"`
  }

	if err := json.NewDecoder(r.Body).Decode(&car); err != nil {
		fmt.Fprint(w, "Body inválido!")
		return
  }

	fmt.Fprint(w, html.EscapeString(car.Plaque))
}
