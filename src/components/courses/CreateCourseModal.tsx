"use client";

import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useCreateCourse } from "@/hooks/useCreateCourse";
import CourseFormModal from "./CourseFormModal";

export default function CreateCourseModal() {
  const { isOpen, openModal, closeModal } = useModal();

  const mutation = useCreateCourse(() => {
    closeModal();
  });

  return (
    <>
      <Button size="sm" onClick={openModal}>Add Course</Button>

      <CourseFormModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Create New Course"
        descriptionText="Fill in the details below to create a new course."
        defaultValues={{
          title: "",
          description: "",
          price: 0,
          status: "draft",
          image: "",
        }}
        onSubmit={(values) => mutation.mutate(values)}
        isPending={mutation.isPending}
        submitLabel="Create Course"
      />
    </>
  );
}
