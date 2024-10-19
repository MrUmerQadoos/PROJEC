"use client";

import { useState } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import { useRouter } from "next/navigation";
import { RepoType, IProjectItem } from "@/types";
import { Balancer } from "react-wrap-balancer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";
import Column from "@/components/core/Column";
import Row from "@/components/core/Row";
import CardBox from "@/components/core/CardBox";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    background: "#181818",
    borderRadius: "10px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    color: "#FFF",
    maxWidth: "800px",
    maxHeight: "700px",
    height: "100%",
    width: "100%",
    // Remove or set textAlign to a valid value
    // textAlign: "center", // Optional if needed
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};


const ProjectItem = ({ project }: { project: IProjectItem }) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setShowVideo(false); // Close video when modal is closed
  };

  const handleWatchVideo = () => {
    setShowVideo(true);
  };

  return (
    <>
      {/* Project Card */}
      <CardBox
        classNames="min-w-[calc(100%-2rem)] sm:min-w-[25rem] md:min-w-[28rem] aspect-[3/5] max-h-[30rem] p-4 gap-8 items-center justify-between bg-[var(--textColor10)] group slide_in"
      >
        <Column classNames="w-full items-center justify-start">
          <Row classNames="w-[2.5rem] md:w-[3rem] aspect-square items-center justify-center">
            <Image
              src={project.icon}
              alt={`project-${project.title}`}
              width={100}
              height={100}
              sizes="100%"
              loading="lazy"
              placeholder="blur"
              blurDataURL={project.icon}
              className="w-full h-full object-cover aspect-square"
            />
          </Row>

          <p className="text-lg/6 font-semibold mt-4">{project.title}</p>

          <div
            className={`flex flex-row items-center justify-center rounded-full py-[0.05] px-[0.5rem] mt-4 capitalize text-center border ${
              project.repoType === RepoType.Private
                ? "text-[var(--errorColor)] border-[var(--errorColor50)]"
                : "text-[var(--successColor)] border-[var(--successColor50)]"
            }`}
          >
            <p className="text-xs/6 font-semibold">
              {project.repoType === RepoType.Private ? "Private" : "Public"}
            </p>
          </div>

          <Row classNames="w-full items-center justify-center mt-4 gap-2">
            {project.githubUrl ? (
              <Link
                href={project.githubUrl}
                aria-label={`${project.title} GitHub URL`}
                target="_blank"
                className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-base/6 text-[var(--textColor)]"
                />
              </Link>
            ) : null}

            <button
              aria-label="View options"
              onClick={openModal}
              className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="text-base/6 text-[var(--textColor)]"
              />
            </button>
          </Row>
        </Column>

        <Column classNames="w-full items-center">
          <p className="text-center text-base/6">
            <Balancer>{project.description}</Balancer>
          </p>

          {project.tags && project.tags.length > 0 ? (
            <Row classNames="w-full items-center justify-center flex-wrap mt-4">
              {project.tags.map((tag, i) => {
                return (
                  <p
                    key={`tag-${i}`}
                    className="rounded-[var(--borderRadius)] border border-[var(--textColor50)] py-[.125rem] px-2 mr-2 mb-2 text-xs/6 font-normal"
                  >
                    {tag}
                  </p>
                );
              })}
            </Row>
          ) : null}
        </Column>
      </CardBox>

      {/* Modal for choosing between "Live Site" or "Watch Video" */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Project Options"
      >
        <h2 className="text-2xl font-semibold mb-4">
          {showVideo ? "Watch Video" : "Choose an Option"}
        </h2>

        {showVideo && project.videoUrl ? (
          <div className="relative pb-9/16 overflow-hidden w-full h-full max-h-[600px]">
            {/* Video Preview using ReactPlayer */}
            <ReactPlayer
  url={project.videoUrl}
  controls
  width="100%"
  height="100%"  // This will ensure that it takes the full height of its container
/>
          </div>
        ) : (
          <div className="flex justify-center gap-6 mt-6">
            {/* Live Site Button */}
            {project.url ? (
              <Link
                href={project.url}
                target="_blank"
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Live Site
              </Link>
            ) : (
              <p className="text-red-500">No Live Site available</p>
            )}

            {/* Watch Video Button */}
            <button
              onClick={handleWatchVideo}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Watch Video
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProjectItem;













