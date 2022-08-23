import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { domesticos } from "../src/datos";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import Consumo from "../components/consumo";

export default function Calculadora() {
  const [selected, setSelected] = useState<Domestico[]>([]);
  const [current, setCurrent] = useState<Domestico>();
  const [isSelected, setIsSelected] = useState(false);
  const [total, setTotal] = useState(0);
  const precioKwh = 0.092;

  console.log(total);
  useEffect(() => {
    selected.forEach((item) =>
      setTotal(
        Number(
          (
            total +
            (item.consumo_nominal / 1000) * item.horas_uso * 30 * precioKwh
          ).toFixed(2)
        )
      )
    );
  }, [selected]);

  return (
    <div
      id="main"
      className="flex flex-col min-h-screen w-screen pt-10 gap-4 items-center"
    >
      <section
        id="head"
        className="flex flex-col w-11/12 items-start py-2 border-b text-sm"
      >
        <p className="text-2xl font-bold text-center mb-4">
          Calculadora de consumo energético
        </p>
        <p className="text-lg font-medium">Cómo funciona?</p>
        <p>1. Seleccione un electrodoméstico a la vez con un click.</p>
        <p>2. Ingrese las hora de uso por día.</p>
        <p>3. Agregue el electrodoméstico seleccionado con |+|.</p>
        <p>
          4. Automáticamente se empezará a calcular el valor total mensual a
          pagar
        </p>
        <p>5. Pulse |Limpiar| para empezar un nuevo cálculo.</p>
        <p className="font-semibold text-xs mt-4">
          Nota: El precio del kW/h en Ecuador es de 9.2 centavos de dolar.
        </p>
      </section>

      <section
        id="current"
        className={`${
          isSelected ? "flex" : "hidden"
        } h-auto w-11/12 border border-slate-400 p-2 gap-2 justify-center`}
      >
        <div>
          <p className="text-base mb-1 border-b border-slate-400 font-bold">
            {current?.nombre}
          </p>
          <span className="flex flex-col">
            <label className="flex text-xs gap-2">
              Horas de consumo al día:
              <input
                className="flex border"
                placeholder="Ingrese un número"
                defaultValue={0}
                maxLength={24}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (current)
                    setCurrent({
                      nombre: current.nombre,
                      consumo_nominal: current.consumo_nominal,
                      horas_uso: e.target.valueAsNumber,
                    });
                }}
              ></input>
            </label>
          </span>
        </div>
        <span
          id="Add button"
          className="flex hover:bg-slate-400 w-1/5 bg-gray-300 justify-center items-center"
          onClick={() => {
            if (current && current.horas_uso && current.horas_uso != 0) {
              setIsSelected(false);
              setSelected([
                ...selected,
                {
                  nombre: current.nombre,
                  consumo_nominal: current.consumo_nominal,
                  horas_uso: current.horas_uso,
                },
              ]);
            } else alert("Ingrese el número de horas de consumo al día");
          }}
        >
          <FontAwesomeIcon icon="plus" />
        </span>
      </section>
      <section
        id="selected"
        className="flex flex-col flex-grow w-11/12 border gap-y-2"
      >
        <span className="flex gap-2 px-1 text-xs h-10 border-b justify-center items-center text-center font-bold">
          <p className="flex w-1/4 justify-center">Artículo</p>
          <p className="flex w-1/4 justify-center">Consumo nominal -W-</p>
          <p className="flex w-1/4 justify-center">Consumo diario -h-</p>
          <p className="flex w-1/4 justify-center">Costo mensual</p>
        </span>
        {selected.length == 0 && (
          <span className="text-sm text-center text-gray-800 mb-4">
            No hay electrodomésticos añadidos aún
          </span>
        )}

        {selected.length != 0 && (
          <div className="flex flex-col justify-between">
            {selected.map((d, i) => {
              return (
                <span
                  key={`Seleccionado-${d.nombre}-${d.horas_uso}`}
                  className="flex gap-2 px-1 text-sm"
                >
                  <p className="flex w-1/4 justify-center">{d.nombre}</p>
                  <p className="flex w-1/4 justify-center">
                    {d.consumo_nominal}
                  </p>
                  <p className="flex w-1/4 justify-center">{d.horas_uso}</p>
                  <p className="flex w-1/4 justify-center">
                    $
                    {Number(
                      (
                        (d.consumo_nominal / 1000) *
                        d.horas_uso *
                        30 *
                        precioKwh
                      ).toFixed(4)
                    )}
                  </p>
                </span>
              );
            })}
            <span className="flex text-sm font-bold justify-between mt-3 border-t">
              <button
                className="border p-1 bg-gray-100"
                onClick={() => {
                  setTotal(0);
                  setSelected([]);
                }}
              >
                Limpiar
              </button>
              Costo total mensual: ${total}
            </span>
          </div>
        )}
      </section>

      <p className="flex text-start font-bold text-base">
        LISTA DE ELECTRODOMÉSTICOS
      </p>
      <section id="appliances" className="grid grid-cols-2 gap-2 w-11/12">
        {domesticos.map((d, i) => {
          return (
            <div
              key={`domestico-${i}`}
              className="flex flex-row border-2 h-28 rounded-br-lg overflow-hidden"
              onClick={() => {
                setIsSelected(true);
                setCurrent(d);
              }}
            >
              <span className="flex flex-col bg-gray-400">
                <Image
                  src={`/images/${d.nombre}.jpg`|| "/images/default.jpg"}
                  width={640}
                  height={640}
                  objectFit="cover"
                  alt="fotografía_miembro"
                />
                <p className="text-sm text-center">{d.nombre}</p>
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}
