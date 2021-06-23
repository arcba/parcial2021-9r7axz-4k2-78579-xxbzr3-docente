import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { ModalDialogService } from '../../services/modal-dialog.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  Productos: Producto[] = [];
  Alta: boolean = false;
  formProductos: FormGroup;
  submitted: boolean = false;
  constructor(
    private prodService: ProductosService,
    private fb: FormBuilder,
    private dialogServ: ModalDialogService
  ) {
    this.formProductos = this.fb.group({
      Id: [0, [Validators.required, Validators.pattern('[0]')]],
      Nombre: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      FechaAlta: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          )
        ]
      ],
      Stock: [1]
    });
  }

  ngOnInit() {
    this.GetProductos();
  }

  GetProductos() {
    this.prodService.get().subscribe((res: Producto[]) => {
      this.Productos = res;
    });
    this.submitted = false;
  }

  RegistrarProducto() {
    this.Alta = false;
    this.submitted = true;
    if (this.formProductos.invalid) {
      return;
    }
    const prod = { ...this.formProductos.value };
    var arrayFecha = prod.FechaAlta.substr(0, 10).split('/');
    if (arrayFecha.length == 3) {
      prod.FechaAlta = new Date(
        arrayFecha[2],
        arrayFecha[1] - 1,
        arrayFecha[0]
      ).toISOString();
    }
    this.prodService.post(prod).subscribe((res: any) => {
      this.dialogServ.Alert('Registro agregado correctamente.');
      this.GetProductos();
    });
  }
}
