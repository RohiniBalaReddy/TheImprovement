import { useState } from "react";
import Button from "@/common/Button";
import Image from "next/image";
import { CheckCircle, AlertTriangle, Target } from "lucide-react";

export interface Material {
  name: string;
  image: string;
  lifespan: string;
  maintenance: "Low" | "Medium" | "High";
  costLevel: "$" | "$$" | "$$$";
  pros: string[];
  cons: string[];
  bestFor: string[];
}

export default function MaterialComparison({
  materials,
}: {
  materials: Material[];
}) {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight  text-center mx-auto">
          Choose Your Exterior Material
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 mx-auto mt-4 rounded-full"></div>

        <div className="flex md:flex-wrap overflow-auto justify-center md:gap-4 gap-2 md:mb-8 mb-4 mt-2 md:mt-1">
          {materials.map((material) => (
            <Button
              key={material.name}
              onClick={() => setSelectedMaterial(material)}
              className={`md:px-6 px-3 md:py-3 py-2 rounded-lg  md:text-[14px] text-[12px] font-Gordita-Medium transition-all ${
                selectedMaterial.name === material.name
                  ? "bg-[#5297ff] text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {material.name}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 md:gap-8 gap-3 bg-white md:p-8 p-3 rounded-xl shadow-lg">
          <div>
            <div className="relative w-full md:h-80 h-60">
              <Image
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="grid grid-cols-3 md:gap-4 gap-2 md:mt-6 mt-2">
              <div className="text-center md:p-4 p-2 bg-blue-50 rounded-lg">
                <p className="text-gray-600 md:text-sm text-[14px]">Lifespan</p>
                <p className="font-Gordita-Bold md:text-lg text-[12px]">
                  {selectedMaterial.lifespan}
                </p>
              </div>

              <div className="text-center md:p-4 p-2 bg-green-50 rounded-lg">
                <p className="text-gray-600 md:text-sm text-[14px]">
                  Maintenance
                </p>
                <p className="font-Gordita-Bold md:text-lg text-[12px]">
                  {selectedMaterial.maintenance}
                </p>
              </div>

              <div className="text-center md:p-4 p-2 bg-purple-50 rounded-lg">
                <p className="text-gray-600 md:text-sm text-[14px]">
                  Cost Level
                </p>
                <p className="font-Gordita-Bold md:text-lg text-[12px]">
                  {selectedMaterial.costLevel}
                </p>
              </div>
            </div>
          </div>

          <div className="md:space-y-6 space-y-3">
            <div>
              <h3 className="md:text-xl text-[14px] font-Gordita-Bold mb-3 text-green-600 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Advantages
              </h3>

              <ul className="md:space-y-2 space-y-1 font-Gordita-Regular">
                {selectedMaterial.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="md:text-xl text-[14px] font-Gordita-Bold mb-3 text-orange-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Considerations
              </h3>

              <ul className="md:space-y-2 space-y-1 font-Gordita-Regular">
                {selectedMaterial.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-1" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="md:text-xl text-[14px] font-Gordita-Bold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Best Applications
              </h3>

              <div className="flex flex-wrap gap-2">
                {selectedMaterial.bestFor.map((application, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full md:text-sm text-[12px] font-Gordita-Medium"
                  >
                    {application}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
