import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

const ingredients = [
  { id: "cement", name: "Cemento", correct: true },
  { id: "sand", name: "Arena", correct: true },
  { id: "water", name: "Agua", correct: true },
  { id: "gravel", name: "Grava", correct: true },
  { id: "paint", name: "Pintura", correct: false }, // Trampa
  { id: "oil", name: "Aceite", correct: false } // Trampa
];

const DraggableItem = ({ ingredient }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ingredient.id
  });
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : {};

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-pointer p-2 bg-gray-200 rounded shadow-md"
      whileHover={{ scale: 1.1 }}
    >
      {ingredient.name}
    </motion.div>
  );
};

const DroppableMixer = ({ onDrop }) => {
  const { setNodeRef } = useDroppable({ id: "mixer" });

  return (
    <div
      ref={setNodeRef}
      className="w-60 h-40 bg-gray-300 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-500"
    >
      <p>Arrastra los ingredientes aquí</p>
    </div>
  );
};

export default function CemexMixingGame() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "mixer") {
      const ingredient = ingredients.find((i) => i.id === active.id);
      if (ingredient) {
        setSelectedIngredients((prev) => [...prev, ingredient]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-xl font-bold mb-4">Juego de Mezclas - CEMEX</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 mb-6">
          {ingredients.map((ingredient) => (
            <DraggableItem key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
        <DroppableMixer />
      </DndContext>
      <Card className="mt-6 w-80">
        <CardContent>
          <h2 className="text-lg font-semibold">Ingredientes Seleccionados</h2>
          <ul>
            {selectedIngredients.map((item, index) => (
              <li key={index} className={item.correct ? "text-green-500" : "text-red-500"}>
                {item.name} {item.correct ? "✔" : "✖"}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
