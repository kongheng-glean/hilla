import React, { useEffect, useState } from "react";
import Student from "Frontend/generated/com/example/application/entity/Student";
import { StudentController } from "Frontend/generated/endpoints";
import DeleteStudent from "./DeleteStudent";
import ModifyStudent from "./ModifyStudent";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { Button } from "@hilla/react-components/Button.js";

export default function ManageStudent() {
    const [students, setStudents] = useState<Student[]>([]);
    const [deleteStudentId, setDeleteStudentId] = useState<number | undefined>(undefined);
    const [editStudentId, setEditStudentId] = useState<number | undefined>(undefined);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setStudents(await StudentController.fetchAllStudents());
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const onEdit = (studentId: number) => {
        setEditStudentId(studentId);
    };

    const onDelete = (studentId: number) => {
        setDeleteStudentId(studentId);
    };

    const handleDeleteSuccess = () => {
        setDeleteStudentId(undefined);
        fetchStudents();
    };

    const handleModifySuccess = () => {
        setEditStudentId(undefined);
        fetchStudents();
    };

    const handleAddNew = () => {
        setEditStudentId(undefined);
    }

    return (
        <>
            <ModifyStudent editStudentId={editStudentId} onModifySuccess={handleModifySuccess} onAddNew={handleAddNew}/>
            <DeleteStudent studentId={deleteStudentId} onDeleteSuccess={handleDeleteSuccess} />
            <Grid items={students}>
                <GridColumn path="firstName" />
                <GridColumn path="lastName" />
                <GridColumn path="grade" />
                <GridColumn path="age" />
                <GridColumn path="dateOfBirth" />
                <GridColumn header="Action">
                    {student => (
                        <>
                            <Button theme="tertiary-inline" className="mr-m" onClick={() => onEdit(student.item.id)}>
                                Edit
                            </Button>
                            <Button theme="tertiary-inline error" onClick={() => onDelete(student.item.id)}>
                                Delete
                            </Button>
                        </>
                    )}
                </GridColumn>
            </Grid>
        </>
    );
}
