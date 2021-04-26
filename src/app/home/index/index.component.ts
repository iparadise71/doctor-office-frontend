import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public slideList = [
    {
      img: './assets/img/doctor.jpeg',
      title: 'Actualizaciones para nuestros visitantes',
      description: 'Para garantizar la seguridad, estamos siguiendo las últimas pautas del estado de Nueva York para dar la bienvenida a los visitantes a nuestros hospitales.'
    },
    {
      img: './assets/img/doctor2.jpeg',
      title: 'Mount Sinai Venture incluida en la lista anual de Fast Company de las empresas más innovadoras del mundo para 2021',
      description: 'Kantaro Biosciences entre los primeros clasificados en la categoría Joint Venture.'
    },
    {
      img: './assets/img/doctor3.jpeg',
      title: 'Los mejores hospitales del mundo en 2021',
      description: 'El Hospital Mount Sinai ha vuelto a obtener los máximos honores en la lista de Newsweek de los mejores hospitales del mundo.'
    }
  ]

  public optionList =[
    {
      img: '',
      title: 'Doctores',
      description: 'Lista de doctores de turno',
      actionLbl: 'ver mas...',
      action: '/doctors'
    },
    {
      img: '',
      title: 'Pacientes',
      description: 'Lista de pacientes abituales',
      actionLbl: 'ver mas...',
      action: '/patients'
    },
    {
      img: '',
      title: 'Consultas',
      description: 'Lista de consultas',
      actionLbl: 'ver mas...',
      action: '/medical-record'
    }
  ]

  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
  }

}
