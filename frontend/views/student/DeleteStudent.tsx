import React, { useState, useEffect } from "react";
import Student from "Frontend/generated/com/example/application/entity/Student";
import { StudentController } from "Frontend/generated/endpoints";
import { Dialog } from "@hilla/react-components/Dialog.js";
import { Button } from "@hilla/react-components/Button.js";

interface DeleteStudentProps {
    studentId?: number;
    onDeleteSuccess: () => void; // Callback function to refresh student list
}

export default function DeleteStudent({ studentId, onDeleteSuccess }: DeleteStudentProps) {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [deletingStudent, setDeletingStudent] = useState<Student | undefined>(undefined);

    useEffect(() => {
        if (studentId) {
            fetchStudentById(studentId);
            setDialogOpened(true);
        }
    }, [studentId]);

    const fetchStudentById = async (id: number) => {
        try {
            const student = await StudentController.fetchStudentById(id);
            setDeletingStudent(student);
        } catch (error) {
            console.error("Error fetching student by ID:", error);
        }
    };

    const handleDelete = async () => {
        if (studentId) {
            await StudentController.deleteStudent(studentId);
            setDialogOpened(false);
            onDeleteSuccess();
        }
    };

    return (
        <Dialog
            headerTitle={`Delete student "${deletingStudent?.firstName} ${deletingStudent?.lastName}"`}
            opened={dialogOpened}
            onOpenedChanged={({ detail }) => {
                setDialogOpened(detail.value);
            }}
            footerRenderer={() => (
                <>
                    <Button theme="primary error" onClick={handleDelete} style={{ marginRight: 'auto' }}>
                        Delete
                    </Button>
                    <Button theme="tertiary" onClick={() => setDialogOpened(false)}>
                        Cancel
                    </Button>
                </>
            )}
        >
            Are you sure you want to delete this student permanently?
        </Dialog>
    );
}
