package p

import (
  "encoding/json"
  "fmt"
  "html"
  "net/http"

  "cloud.google.com/go/firestore"
)


func CreateCars(w http.ResponseWriter, r *http.Request) {

  var car struct {
    Plaque string `json:"plaque"`
    Color string `json:"color"`
    Price string `json:"price"`
    CarModel string `json:"carModel"`
    Brand string `json:"brand"`
  }

  ctx := context.Background()

	if err := json.NewDecoder(r.Body).Decode(&car); err != nil {
		fmt.Fprint(w, "Body inválido!")
		return
  }

  client, err := firestore.NewClient(ctx, "projectID")
  if err != nil {
    fmt.Fprint(w, "Erro ao conectar firestore.")
  }

  wr, err := ny.Create(ctx, car)

  if err != nil {
    fmt.Fprint(w, "Erro ao salvar o carro.")
  }

  fmt.Println(wr)

	fmt.Fprint(w, html.EscapeString({car.Plaque, car.Color, car.Price, car.CarModel, car.Brand}))
}
