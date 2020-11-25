
CREATE TABLE PROVEEDOR (
    id NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT pk_id_proveedor primary key(id)
);

create sequence auto_id_proveedor start with 1 increment by 1;
create or replace trigger Auto_id_proveedor
before insert on PROVEEDOR
for each row
begin
  select auto_id_proveedor.nextval into :new.id from dual;
end;

CREATE TABLE MARCA (
    id NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT pk_id_marca primary key(id)
)
create sequence auto_id_marca start with 1 increment by 1;
create or replace trigger Auto_id_marca
before insert on MARCA
for each row
begin
  select auto_id_marca.nextval into :new.id from dual;
end;

CREATE TABLE PERMISO (
    id NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT pk_id_permiso primary key(id)
)
create sequence auto_id_permiso start with 1 increment by 1;
create or replace trigger Auto_id_permiso
before insert on PERMISO
for each row
begin
  select auto_id_permiso.nextval into :new.id from dual;
end;

CREATE TABLE ROL (
    id NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT pk_id_rol primary key(id)
)
create sequence auto_id_rol start with 1 increment by 1;
create or replace trigger Auto_id_rol
before insert on ROL
for each row
begin
  select auto_id_rol.nextval into :new.id from dual;
end;

CREATE TABLE PERMISO_ROL (
    id_permiso NUMBER(8) NOT NULL,
    id_rol NUMBER(8) NOT NULL,
    CONSTRAINT pk_id_permiso_rol primary key(id_permiso,id_rol),
    CONSTRAINT fk_id_permiso_rol foreign key(id_permiso) REFERENCES PERMISO(id),
    CONSTRAINT fk_id_rol_permiso_rol foreign key(id_rol) REFERENCES ROL(id)
)

CREATE TABLE USUARIO (
    id NUMBER(8) NOT NULL,
    id_rol NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(250) NOT NULL,
    CONSTRAINT pk_id_usuario primary key(id),
    CONSTRAINT fk_id_usuario_rol foreign key(id_rol) REFERENCES ROL(id)
 )

create sequence auto_id_usuario start with 1 increment by 1;
create or replace trigger Auto_id_usuario
before insert on usuario
for each row
begin
  select auto_id_usuario.nextval into :new.id from dual;
end;

CREATE TABLE DIRECCION(
    id NUMBER(8) NOT NULL,
    id_usuario NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    
    constraint pk_id_direccion primary key(id),
    constraint fk_id_direccion_usuario foreign key(id_usuario) REFERENCES USUARIO(id)
)

create sequence auto_id_direccion start with 1 increment by 1;
create or replace trigger auto_id_direccion
before insert on DIRECCION
for each row
begin
  select auto_id_direccion.nextval into :new.id from dual;
end;


CREATE TABLE SUCURSAL (
    id NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT pk_id_surcursal primary key(id)
)
create sequence auto_id_sucursal start with 1 increment by 1;
create or replace trigger Auto_id_sucursal
before insert on SUCURSAL
for each row
begin
  select auto_id_sucursal.nextval into :new.id from dual;
end;

CREATE TABLE PRODUCTO (
    id NUMBER(8) NOT NULL,
    id_marca NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    precio NUMBER(12, 2) NOT NULL,
    image VARCHAR(500),
    CONSTRAINT pk_id_producto primary key(id),
    CONSTRAINT fk_id_marca_producto foreign key(id_marca) REFERENCES MARCA(id)
) 

create sequence auto_id_producto start with 1 increment by 1;
create or replace trigger Auto_id_producto
before insert on PRODUCTO
for each row
begin
  select auto_id_producto.nextval into :new.id from dual;
end;

CREATE TABLE TIPO_PAGO (
    id NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT pk_id_tipo_pago primary key(id)
)

create sequence auto_id_tipo_pago start with 1 increment by 1;
create or replace trigger Auto_id_tipo_pago
before insert on TIPO_PAGO
for each row
begin
  select auto_id_tipo_pago.nextval into :new.id from dual;
end;

CREATE TABLE TIPO_COMPRA (
    id NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT pk_id_tipo_compra primary key(id)
)

create sequence auto_id_tipo_compra start with 1 increment by 1;
create or replace trigger Auto_id_tipo_compra
before insert on TIPO_COMPRA
for each row
begin
  select auto_id_tipo_compra.nextval into :new.id from dual;
end;

CREATE TABLE STATUS_COMPRA (
    id NUMBER(8) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    CONSTRAINT pk_id_status_com primary key(id)
)

create sequence auto_id_status_compra start with 1 increment by 1;
create or replace trigger auto_id_status_compra
before insert on STATUS_COMPRA
for each row
begin
  select auto_id_status_compra.nextval into :new.id from dual;
end;

CREATE TABLE COMPRA (
    id NUMBER(8) NOT NULL,
    referencia VARCHAR(500),
    id_cliente NUMBER(8),
    id_status NUMBER(8) NOT NULL,
    id_vendedor NUMBER(8),
    id_sucursal NUMBER(8),    
    id_tipo_compra NUMBER(8) NOT NULL,    
    fecha_creacion DATE NOT NULL,
    
    constraint pk_id_compra primary key(id),
    constraint fk_id_cliente foreign key(id_cliente) REFERENCES USUARIO(id),
    constraint fk_id_status foreign key(id_status) REFERENCES STATUS_COMPRA(id),
    constraint fk_id_vendedor foreign key(id_vendedor) REFERENCES USUARIO(id),
    constraint fk_id_sucursal foreign key(id_sucursal) REFERENCES SUCURSAL(id),
    constraint fk_id_tipo_compra foreign key(id_tipo_compra) REFERENCES TIPO_COMPRA(id)
)

create sequence auto_id_compra start with 1 increment by 1;
create or replace trigger auto_id_compra
before insert on COMPRA
for each row
begin
  select auto_id_compra.nextval into :new.id from dual;
end;

CREATE TABLE LOG_COMPRA (
    id NUMBER(8) NOT NULL,
    id_compra NUMBER(8) NOT NULL,
    id_status_compra NUMBER(8) NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT pk_id_log_compra primary key(id),
    CONSTRAINT fk_id_log_compra_id foreign key(id_compra) REFERENCES COMPRA(id),
    CONSTRAINT fk_id_log_status_compra foreign key(id_status_compra) REFERENCES STATUS_COMPRA(id)
)

create sequence auto_id_compra_log start with 1 increment by 1;
create or replace trigger auto_id_compra_log
before insert on LOG_COMPRA
for each row
begin
  select auto_id_compra_log.nextval into :new.id from dual;
end;


CREATE TABLE FACTURA(
    id NUMBER(8) NOT NULL,
    id_compra NUMBER(8) NOT NULL,
    nit VARCHAR(50) NOT NULL,
    monto NUMBER(12,2) NOT NULL,
    
    constraint pk_id_factura primary key(id),
    constraint fk_id_compra_factura foreign key(id_compra) REFERENCES COMPRA(id)
)

create sequence auto_id_factura start with 1 increment by 1;
create or replace trigger auto_id_factura
before insert on FACTURA
for each row
begin
  select auto_id_factura.nextval into :new.id from dual;
end;


CREATE TABLE PAGO(
    id NUMBER(8) NOT NULL,
    id_compra NUMBER(8) NOT NULL,
    monto NUMBER(12,2) NOT NULL,
    constraint pk_id_pago primary key(id),
    constraint fk_id_compra_pago foreign key(id_compra) REFERENCES COMPRA(id)
)

create sequence auto_id_pago start with 1 increment by 1;
create or replace trigger auto_id_pago
before insert on PAGO
for each row
begin
  select auto_id_pago.nextval into :new.id from dual;
end;

ALTER TABLE pago add id_tipo_pago NUMBER(8) NOT NULL;
ALTER TABLE pago add CONSTRAINT fk_id_tipo_pago foreign key(id_tipo_pago) REFERENCES TIPO_PAGO(id);

CREATE TABLE ENTREGA (
    id NUMBER(8) NOT NULL,
    id_usuario NUMBER(8) NOT NULL,
    id_compra  NUMBER(8) NOT NULL,
    id_direccion NUMBER(8) NOT NULL,
    constraint pk_id_entrega primary key(id),
    constraint fk_id_usuario_entrega foreign key(id_usuario) REFERENCES USUARIO(id),
    constraint fk_id_entrega_compra foreign key(id_compra) REFERENCES COMPRA(id),
    constraint fk_id_entrega_direccion foreign key(id_compra) REFERENCES DIRECCION(id)
)

create sequence auto_id_entrega start with 1 increment by 1;
create or replace trigger auto_id_entrega
before insert on ENTREGA
for each row
begin
  select auto_id_entrega.nextval into :new.id from dual;
end;


CREATE TABLE ENCUESTA (
    id NUMBER(8) NOT NULL,
    id_cliente NUMBER(8) NOT NULL,
    id_compra NUMBER(8) NOT NULL,
    calificacion NUMBER(8) NOT NULL,
    comentarios VARCHAR(50) NOT NULL,
    
    constraint pk_id_encuesta primary key(id),
    constraint fk_id_encuesta_cliente foreign key(id_cliente) REFERENCES USUARIO(id),
    constraint fk_id_encuesta_compra foreign key(id_compra) REFERENCES COMPRA(id)
)

create sequence auto_id_encuesta start with 1 increment by 1;
create or replace trigger auto_id_encuesta
before insert on ENCUESTA
for each row
begin
  select auto_id_encuesta.nextval into :new.id from dual;
end;
 
CREATE TABLE PRODUCTO_COMPRA (
    id NUMBER(8) NOT NULL,
    id_compra NUMBER(8) NOT NULL,
    id_producto NUMBER(8) NOT NULL,
    cantidad NUMBER(8) NOT NULL,
    constraint pk_id_producto_compra primary key(id),
    constraint fk_id_compra_producto_compra foreign key(id_compra) REFERENCES COMPRA(id),
    constraint fk_id_producto_compra_item foreign key(id_producto) REFERENCES PRODUCTO(id) 
)

create sequence auto_id_producto_compra start with 1 increment by 1;
create or replace trigger auto_id_producto_compra
before insert on PRODUCTO_COMPRA
for each row
begin
  select auto_id_producto_compra.nextval into :new.id from dual;
end;

CREATE TABLE PEDIDO (
    id NUMBER(8) NOT NULL,
    id_proveedor NUMBER(8) NOT NULL,
    id_producto NUMBER(8) NOT NULL,
    id_sucursal NUMBER(8) NOT NULL,
    fecha_creacion DATE,
    fecha_ingreso DATE,
                   
    constraint pk_id_pedido primary key(id),
    constraint fk_id_pedido_proveedor foreign key(id_proveedor) REFERENCES PROVEEDOR(id),
    constraint fk_id_pedido_producto foreign key(id_producto) REFERENCES PRODUCTO(id),
    constraint fk_id_pedido_sucursal foreign key(id_sucursal) REFERENCES SUCURSAL(id)
)

create sequence auto_id_pedido start with 1 increment by 1;
create or replace trigger auto_id_pedido
before insert on PEDIDO
for each row
begin
  select auto_id_pedido.nextval into :new.id from dual;
end;

CREATE TABLE PEDIDO_PRODUCTO(
    id NUMBER(8) NOT NULL,
    id_producto NUMBER(8) NOT NULL,
    id_pedido NUMBER(8) NOT NULL,
    cantidad NUMBER(8) NOT NULL,
    constraint pk_id_pedido_producto primary key(id),
    constraint fk_id_pedido_producto_pedido foreign key(id_pedido) REFERENCES PEDIDO(id),
    constraint fk_id_pedido_producto_producto foreign key(id_producto) REFERENCES PRODUCTO(id)
)

create sequence auto_id_pedido_producto start with 1 increment by 1;
create or replace trigger auto_id_pedido_producto
before insert on PEDIDO_PRODUCTO
for each row
begin
  select auto_id_pedido_producto.nextval into :new.id from dual;
end;

CREATE TABLE INVENTARIO (
    id_producto NUMBER(8) NOT NULL,
    id_sucursal NUMBER(8) NOT NULL,
    constraint pk_id_inventario primary key(id_producto, id_sucursal),
    constraint fk_id_inventario_producto foreign key(id_producto) REFERENCES PRODUCTO(id),
    constraint fk_id_inventario_sucursal foreign key(id_sucursal) REFERENCES SUCURSAL(id)
)
ALTER TABLE INVENTARIO ADD cantidad number(12) not null;


/*----------Utilidades-------------*/
create or replace trigger log_compra_status_trigger
after update on COMPRA
for each row
begin
    if :new.id_status != :old.id_status then 
        INSERT INTO LOG_COMPRA(id_compra, id_status_compra,fecha) VALUES (:old.id, :old.id_status, sysdate);
    end if;
end;
/*-----------------------*/


/* -------------------------------------- */
/* -------------------------------------- */
/* -------------------------------------- */


/* inserts para roles y permisos*/
INSERT INTO PERMISO(nombre) VALUES ('Crear Usuario');
INSERT INTO PERMISO(nombre) VALUES ('Crear Compra');
INSERT INTO PERMISO(nombre) VALUES ('Crear Producto');
INSERT INTO PERMISO(nombre) VALUES ('Crear Pedido');


INSERT INTO ROL(nombre) VALUES('Admin');
INSERT INTO ROL(nombre) VALUES('Cliente');
INSERT INTO ROL(nombre) VALUES('Empleadio');
INSERT INTO ROL(nombre) VALUES('Mensajero');

INSERT INTO PERMISO_ROL(id_rol, id_permiso) VALUES(1,1);
INSERT INTO PERMISO_ROL(id_rol, id_permiso) VALUES(1,2);
INSERT INTO PERMISO_ROL(id_rol, id_permiso) VALUES(1,3);
INSERT INTO PERMISO_ROL(id_rol, id_permiso) VALUES(1,4);

INSERT INTO PERMISO_ROL(id_rol, id_permiso) VALUES(2,2);
INSERT INTO PERMISO_ROL(id_rol, id_permiso) VALUES(2,3);
INSERT INTO PERMISO_ROL(id_rol, id_permiso) VALUES(2,4);

INSERT INTO PERMISO_ROL(id_rol, id_permiso) VALUES(3,2);

/* inserts para estados, entre otras tablas*/

INSERT INTO MARCA (nombre) VALUES('Honda');
INSERT INTO MARCA (nombre) VALUES('Toyota');
INSERT INTO MARCA (nombre) VALUES('Audi');
INSERT INTO MARCA (nombre) VALUES('Subaru');
INSERT INTO MARCA (nombre) VALUES('Mazda');


INSERT INTO PROVEEDOR (nombre) VALUES ('Honda');
INSERT INTO PROVEEDOR (nombre) VALUES ('Toyota');
INSERT INTO PROVEEDOR (nombre) VALUES ('Audi');
INSERT INTO PROVEEDOR (nombre) VALUES ('Subaru');
INSERT INTO PROVEEDOR (nombre) VALUES ('Mazda');

INSERT INTO SUCURSAL (nombre) VALUES ('San jose pinula');
INSERT INTO SUCURSAL (nombre) VALUES ('Villa canales');
INSERT INTO SUCURSAL (nombre) VALUES ('Santa Elena Barillas');
INSERT INTO SUCURSAL (nombre) VALUES ('Mixco');


INSERT INTO TIPO_PAGO (nombre) VALUES('Tarjeta');
INSERT INTO TIPO_PAGO (nombre) VALUES('Efectivo');
INSERT INTO TIPO_PAGO (nombre) VALUES('Efectivo contra entrega');
INSERT INTO TIPO_PAGO (nombre) VALUES('Tarjeta contra entrega');
INSERT INTO TIPO_PAGO (nombre) VALUES('Deposito o transferencia');

INSERT INTO TIPO_COMPRA (nombre) VALUES('En tienda');
INSERT INTO TIPO_COMPRA (nombre) VALUES('En linea');


INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(1, 1, 10);
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(1, 2, 10);   
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(1, 3, 10);   
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(1, 4, 10);   

INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(2, 1, 10);
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(2, 2, 10);   
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(2, 3, 10);   
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(2, 4, 10);  

INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(3, 1, 10);
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(3, 2, 10);   
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(3, 3, 10);   
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(3, 4, 10); 


INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(4, 1, 10);
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(4, 2, 10);   
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(4, 3, 10);   
INSERT INTO INVENTARIO (id_sucursal, id_producto, cantidad) VALUES(4, 4, 10); 

INSERT INTO STATUS_COMPRA(id, nombre) VALUES(1,'creada');
INSERT INTO STATUS_COMPRA(id, nombre) VALUES(2,'en proceso');
INSERT INTO STATUS_COMPRA(id, nombre) VALUES(3,'pendiente de pago');
INSERT INTO STATUS_COMPRA(id, nombre) VALUES(4,'en camino');
INSERT INTO STATUS_COMPRA(id, nombre) VALUES(5,'pagada');
INSERT INTO STATUS_COMPRA(id, nombre) VALUES(6,'entregada');
INSERT INTO STATUS_COMPRA(id, nombre) VALUES(7,'cancelada');

COMMIT;