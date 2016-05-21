import Html exposing (..)
import Html.App
import Constants exposing (..)
import SomeModule.Sub exposing (..)

main =
  Html.App.beginnerProgram
    { model = (foo ++ bar ++ baz)
    , view = text
    , update = (\msg model -> model)
    }
