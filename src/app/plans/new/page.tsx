"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/services/session";
import { createPlan } from "@/services/plans";

function validacion(field: string, value: string): string {
  switch (field) {
    case "image":
      if (!value) return "La imagen es obligatoria";
      return "";
    case "name":
      if (!value) return "El nombre es obligatorio";
      if (value.length > 60) return "El nombre debe ser maximo 60 caracteres";
      return "";
    case "address":
      if (!value) return "La dirección es obligatoria";
      return "";
    case "estimatedPrice":
      if (!value) return "El precio es obligatorio";
      if (Number(value) < 0) return "El precio debe ser positivo";
      return "";
    case "estimatedTime":
      if (!value) return "La duración es obligatoria";
      if (Number(value) < 0) return "La duración debe ser positiva";
      return "";
    case "description":
      if (!value) return "La descripción es obligatoria";
      if (value.length > 600 || value.length < 10) return "La descripción debe ser menor a 600 caracteres y mayor a 10 caracteres";
      return "";
    case "recomendations":
      if (!value) return "Las recomendaciones son obligatorias";
      return "";
    default:
      return "";
  }

}

export default function NewPlanPage() {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [recomendations, setRecomendations] = useState("");
  const [equipment, setEquipment] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    address: "",
    estimatedPrice: "",
    estimatedTime: "",
    description: "",
    recomendations: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // El id del usuario se guardó en el localStorage al iniciar sesión
    const session = getSession();

    if (!session.id) {
      router.push("/auth/login");
      return;
    }


    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      const error = validacion(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }

    try {
      await createPlan({
        name,
        description,
        estimatedPrice: Number(estimatedPrice),
        estimatedTime: Number(estimatedTime),
        recomendations,
        address,
        image,
        userId: session.id,
      });
      router.push("/plans");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        name: "Error al crear el plan",
      }));
    }
  }

  return (
    <div className="flex-1 bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto">

        <h3 className="text-4xl font-bold text-slate-900 mt-2">Crear un nuevo plan</h3>
        <p className="text-slate-600 mt-2">
          Organiza, invita a tus amigos o abre plazas para que otros miembros se sumen a vivir
          momentos únicos.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-10 mt-10">
          {/* Imagen */}
          <div className="flex justify-between items-center">
            <label htmlFor="image" className="font-semibold text-slate-900">
              Foto de portada del plan
            </label>
            <p className="text-xs text-slate-500">Copia el enlace de una imagen</p>
          </div>
          <div aria-hidden="true" className="flex flex-col items-center border-2 border-dashed border-slate-300 rounded-2xl p-10 mt-3">
            <span className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </span>
            <p className="text-sm text-slate-500 mt-3">Haz que tu plan destaque a primera vista</p>
            <input
              id="image"
              type="text"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 mt-4 outline-none"
            />
          </div>

          {/* Nombre */}
          <label htmlFor="name" className="block font-semibold text-slate-900 mt-8">
            Nombre del plan <span className="text-orange-700">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="nombre-plan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            //onBlur={handleBlur}
            placeholder="Ej. Tarde de paddle surf y atardecer"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 mt-2 outline-none"
          />

          {/* Dirección */}
          <label className="block font-semibold text-slate-900 mt-8">
            Dirección <span className="text-orange-700">*</span>
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            //onBlur={handleBlur}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 mt-2 outline-none"
          />

          {/* Precio y duración */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div>
              <label className="block font-semibold text-slate-900">
                Precio estimado <span className="text-orange-700">*</span>
              </label>
              <input
                id="estimatedPrice"
                type="number"
                name="estimatedPrice"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
                //onBlur={handleBlur}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 mt-2 outline-none"
              />
            </div>
            <div>
              <label htmlFor="estimatedTime" className="block font-semibold text-slate-900">
                Duración (minutos) <span className="text-orange-700">*</span>
              </label>
              <input
                id="estimatedTime"
                type="number"
                name="estimatedTime"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                //onBlur={handleBlur}
                placeholder="Ej. 120"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 mt-2 outline-none"
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="flex justify-between items-center mt-8">
            <label htmlFor="description" className="font-semibold text-slate-900">
              Descripción del plan <span className="text-orange-700">*</span>
            </label>
            <p className="text-xs text-slate-300">{description.length} / 600</p>
          </div>
          <textarea
            id="description"
            name="description"
            aria-describedby="description-help"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            //onBlur={handleBlur}
            rows={4}
            placeholder="Cuéntale a todos de qué va el plan, cuál es la vibra del grupo, el itinerario aproximado y qué lo hace especial..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 mt-2 outline-none"
          ></textarea>

          {/* Recomendaciones */}
          <label htmlFor="recomendations" className="block font-semibold text-slate-900 mt-8">
            Recomendaciones para los asistentes <span className="text-orange-700">*</span>
          </label>
          <p className="text-sm text-slate-300 mt-1">
            Agrega tips clave como vestimenta recomendada, qué llevar o recordatorios puntuales.
          </p>
          <input
            id="recomendations"
            type="text"
            name="recomendations"
            value={recomendations}
            onChange={(e) => setRecomendations(e.target.value)}
            placeholder="Ej. Llevar protector solar, toalla y agua"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 mt-3 outline-none"
          />
          {/* Equipamiento */}
          <label htmlFor="equipment" className="block font-semibold text-slate-900 mt-8">
            Equipamiento <span className="text-orange-700">*</span>
          </label>
          <input
            id="equipment"
            type="text"
            name="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="Ej. Protector solar, toalla y agua"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-500 mt-3 outline-none"
          />
          <button className="w-full bg-slate-200 text-slate-700 font-semibold rounded-xl px-8 py-3" onClick={() => setEquipment(equipment + " ")}>
            Agregar equipo
            {equipment && (
              <p className="text-sm text-slate-300 mt-1">
                {equipment}
              </p>
            )}
          </button>





          {errors.name && <p className="text-sm text-red-600 mt-6">{errors.name}</p>}

          {/* Botones */}
          <div className="flex justify-end items-center gap-6 border-t border-slate-200 pt-6 mt-10">
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="bg-slate-200 text-slate-700 font-semibold rounded-xl px-8 py-3"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-xl px-10 py-3"
            >
              Publicar plan
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación para cancelar */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-slate-900">¿Cancelar la creación?</h2>
            <p className="text-slate-600 mt-2">
              Si sales ahora, se perderá toda la información que escribiste del plan.
            </p>
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="font-semibold text-slate-700 px-4 py-2"
              >
                Seguir editando
              </button>
              <button
                type="button"
                onClick={() => router.push("/plans")}
                className="bg-red-600 text-white font-semibold rounded-xl px-6 py-2"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
