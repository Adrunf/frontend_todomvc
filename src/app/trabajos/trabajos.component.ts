import { Component, OnInit } from '@angular/core';
import { IWork } from './trabajos.model';
import { TrabajosService } from './trabajos.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class TrabajosComponent implements OnInit {
  //Variable para almacenar trabajos
  public trabajos?: IWork[];
  //Variable de estado de la lista actual
  public tipo?: string;
  //Variable para agregar nuevo trabajo
  public new_trabajo?: string;
  //Variable para presentar modal
  public isCollapsed = true;

  constructor(private servicio: TrabajosService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAllTrabajos();
  }

  //Obtener todos los trabajos
  getAllTrabajos(): void {
    this.servicio.getAll().subscribe((resp: any) => {
      this.trabajos = resp.body;
      this.tipo = "todos";
    });
  }

  //Obtener trabajos completados
  getCompletados(): void {
    this.servicio.getAll().subscribe((resp: any) => {
      let aux = [];
      this.trabajos = resp.body;
      for (let x in this.trabajos) {
        if (this.trabajos[x].active == true) {
          aux.push(this.trabajos[x]);
        }
      }
      this.trabajos = []
      this.trabajos = aux;
      this.tipo = "completos";
    });
  }

  //Obtener trabajos activos
  getActivos(): void {
    this.servicio.getAll().subscribe((resp: any) => {
      let aux = [];
      this.trabajos = resp.body;
      for (let x in this.trabajos) {
        if (this.trabajos[x].active == false) {
          aux.push(this.trabajos[x]);
        }
      }
      this.trabajos = []
      this.trabajos = aux;
      this.tipo = "activos";
    });
  }

  //Cambiar estado del trabajo
  cambiarEstado(index): void {
    let trabajo_modificado = this.trabajos[index];
    if (trabajo_modificado.active == true) {
      trabajo_modificado.active = false
    } else {
      trabajo_modificado.active = true
    }
    this.servicio.update(trabajo_modificado.id, trabajo_modificado).subscribe((resp: any) => {
      if (this.tipo == "completos") {
        this.getCompletados();
      } if (this.tipo == "activos") {
        this.getActivos();
      } else if (this.tipo == "todos") {
        this.getAllTrabajos();
      }
    });
  }

  //Eliminar los trabajos completados
  deleteCompletados(content) {
    let cont = 0;
    for (let x in this.trabajos) {
      if (this.trabajos[x].active == true) {
        cont++;
        this.servicio.delete(this.trabajos[x].id).subscribe((resp: any) => {
          this.getAllTrabajos();
        });
      }
    }
    if (cont == 0) {
      this.modalService.open(content);
    }
  }

  //Agregar nueva tarea
  agregarTarea(){
    let aux = { "work":this.new_trabajo, "active":false};
    this.servicio.create(aux).subscribe((resp: any) => {
      this.getAllTrabajos();
      this.new_trabajo='';
    });
  }
}
