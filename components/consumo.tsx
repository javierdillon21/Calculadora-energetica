import React, { useState } from "react";

export default function Consumo(props: {
  nombre: string;
  consumo_nominal: number;
  horas_uso: number;
}) {
  const [consumo, setConsumo] = useState<number>(
    props.consumo_nominal * props.horas_uso
  );
  console.log(`Consumo de ${props.nombre}: ${consumo}`);
  return (
    <span className="flex gap-4">
      <p>{props.nombre}</p>
      <label>
        {" "}
        Consumo por horas
        <input
          className="flex border w-8"
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.valueAsNumber);
            setConsumo(props.consumo_nominal * event.target.valueAsNumber);
          }}
        ></input>
      </label>
      <p>Consumo: {consumo}</p>
    </span>
  );
}
