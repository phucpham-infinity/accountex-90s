"use client";

import { useModal } from "@/hooks/useModal";
import { useUpdateCourse } from "@/hooks/useUpdateCourse";
import { Course } from "@/hooks/useCourses";
import CourseFormModal from "./CourseFormModal";

interface EditCourseModalProps {
  course: Course;
}

export default function EditCourseModal({ course }: EditCourseModalProps) {
  const { isOpen, openModal, closeModal } = useModal();

  const mutation = useUpdateCourse(() => {
    closeModal();
  });

  return (
    <>
      <button
        onClick={openModal}
        className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500 transition-colors"
        title="Edit Course"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </button>

      <CourseFormModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Edit Course"
        descriptionText="Fill in the details below to update the course."
        defaultValues={{
          title: course.title,
          description: course.description,
          price: course.price,
          status: course.status as "draft" | "published" | "archived",
          image: course.image || "",
        }}
        onSubmit={(values) => mutation.mutate({ id: course._id, data: values })}
        isPending={mutation.isPending}
        submitLabel="Update Course"
      />
    </>
  );
}
