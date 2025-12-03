import React, { useState } from "react";
import Image from "next/image";
import Button from "@/common/Button";
import Modal from "@/common/Modal";
import { MapPin, Clock, Eye } from "lucide-react";

interface Project {
  image: string;
  title: string;
  category?: string;
  location?: string;
  duration?: string;
}

interface Props {
  projects: Project[];
}

const Gallery: React.FC<Props> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [openMediaModal, setOpenMediaModal] = useState(false);
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setOpenMediaModal(true);
  };
  console.log(selectedProject);
  const closeModal = () => {
    setSelectedProject(null);
    setOpenMediaModal(false);
  };

  const categories = [
    "All",
    "Hardwood",
    "Tiles",
    "Laminate",
    "Vinyl",
    "Commercial",
    "Residential",
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter(
        (project) =>
          project.category?.toLowerCase().includes(filter.toLowerCase()) ||
          project.title.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-[#2872a1] to-cyan-500 rounded-full"></div>
            <span className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight">
              Our Portfolio
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-[#2872a1] rounded-full"></div>
          </div>

          <h2 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight">
            Completed Projects
          </h2>

          <p className="text-[14px] font-Gordita-Medium md:text-[16px] text-gray-600 leading-relaxed px-4">
            Explore our exceptional flooring projects that showcase quality
            craftsmanship, innovative designs, and client satisfaction across
            residential and commercial spaces.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-12 md:mt-8 mt-3">
            <div className="text-center">
              <div className="text-[12px] md:text-[16px] font-Gordita-Bold text-[#2872a1]">
                150+
              </div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-[12px] md:text-[16px] font-Gordita-Bold text-[#2872a1]">
                98%
              </div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-[12px] md:text-[16px] font-Gordita-Bold text-[#2872a1]">
                15+
              </div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="flex items-center overflow-auto justify-center gap-3 md:mb-12 mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              className={`md:px-6 px-3 md:py-3 py-2 md:text-[16px] text-[12px] btn-txt rounded-full font-Gordita-Medium transition-all duration-300 ${filter === category
                ? "bg-[#2872a1] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden md:p-2 p-1 border border-gray-100 cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {project.category && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <span className="md:text-sm text-[10px] font-Gordita-Medium text-gray-700">
                      {project.category}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 flex items-end md:p-6 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white md:text-[14px] text-[12px] font-Gordita-Bold mb-2">
                      {project.title}
                    </h3>

                    {project.location && (
                      <p className="text-gray-200 flex items-center gap-2 md:text-sm text-[12px] font-Gordita-Medium">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Eye className="w-5 h-5 text-gray-700" />
                </div>
              </div>

              <div className="md:p-6 p-3">
                <h3 className="md:text-lg text-[12px] font-Gordita-Bold text-gray-900 mb-2 group-hover:text-[#2872a1] transition-colors duration-300">
                  {project.title}
                </h3>

                <div className="flex items-center justify-between md:text-sm text-[10px] text-gray-600 font-Gordita-Medium">
                  {project.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </span>
                  )}

                  {project.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {project.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Modal
          isOpen={openMediaModal}
          closeModal={closeModal}
          className="w-full md:max-w-[700px] max-w-[350px] max-h-[90vh] md:mt-5 mt-0 md:rounded-[10px] rounded-[6px] md:p-3 p-1"
          rootCls="z-[9999]"
          isCloseRequired={false}
        >
          <div className="rounded-3xl bg-white w-full max-h-[90vh] overflow-hidden py-2">
            <div className="relative h-60 sm:h-72 md:h-[250px] lg:h-[280px]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-t-3xl"
              />
            </div>

            <div className="p-3 md:p-8 overflow-hidden">
              <h3 className="text-[14px] md:text-[16px] font-Gordita-Bold text-gray-900 md:mb-4 mb-2">
                {selectedProject.title}
              </h3>

              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-2">
                <div>
                  <h4 className="font-Gordita-Bold text-gray-900 mb-2 md:text-[14px] text-[10px]">
                    Project Details
                  </h4>
                  <div className="md:space-y-2 space-y-1 text-gray-600 font-Gordita-Medium md:text-[14px] text-[10px]">
                    {selectedProject.category && (
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-Gordita-Medium">
                          {selectedProject.category}
                        </span>
                      </div>
                    )}

                    {selectedProject.location && (
                      <div className="flex justify-between md:text-[14px] text-[10px]">
                        <span>Location:</span>
                        <span className="font-Gordita-Medium">
                          {selectedProject.location}
                        </span>
                      </div>
                    )}

                    {selectedProject.duration && (
                      <div className="flex justify-between md:text-[14px] text-[10px]">
                        <span>Duration:</span>
                        <span className="font-Gordita-Medium">
                          {selectedProject.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-Gordita-Bold text-gray-900 mb-2 md:text-[14px] text-[10px]">
                    Features
                  </h4>
                  <ul className="md:space-y-2 space-y-1 text-gray-600 font-Gordita-Medium md:text-[14px] text-[10px]">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#2872a1] rounded-full"></div>
                      Premium Quality Materials
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#2872a1] rounded-full"></div>
                      Expert Craftsmanship
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#2872a1] rounded-full"></div>
                      Timely Completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Gallery;
