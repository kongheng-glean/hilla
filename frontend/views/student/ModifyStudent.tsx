import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Student from "Frontend/generated/com/example/application/entity/Student";
import { StudentController } from "Frontend/generated/endpoints";
import { Dialog } from "@hilla/react-components/Dialog.js";
import { Button } from "@hilla/react-components/Button.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { DatePicker } from "@hilla/react-components/DatePicker.js";

interface ModifyStudentProps {
    editStudentId?: number;
    onModifySuccess: () => void;
    onAddNew: () => void;
}

export default function ModifyStudent({ editStudentId, onModifySuccess, onAddNew }: ModifyStudentProps) {
    const [dialogOpened, setDialogOpened] = useState(false);

    useEffect(() => {
        formik.resetForm();
        if (editStudentId) {
            fetchStudentById(editStudentId);
            setDialogOpened(true);
        }
    }, [editStudentId]);

    const fetchStudentById = async (id: number) => {
        try {
            const student = await StudentController.fetchStudentById(id);
            formik.setValues({
                id: student?.id || 0,
                firstName: student?.firstName || "",
                lastName: student?.lastName || "",
                age: student?.age || 0,
                grade: student?.grade || 0,
                dateOfBirth: student?.dateOfBirth || "",
            });
        } catch (error) {
            console.error("Error fetching student by ID:", error);
        }
    };

    const onAddNewStudent = () => {
        formik.resetForm();
        onAddNew();
        setDialogOpened(true);
    }

    const formik = useFormik({
        initialValues: {
            id: editStudentId ? editStudentId : 0,
            firstName: "",
            lastName: "",
            age: 0,
            grade: 0,
            dateOfBirth: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
        }),
        onSubmit: async (values: Student) => {
            try {
                await StudentController.modifyStudent(values);
                setDialogOpened(false);
                onModifySuccess();
            } catch (error) {
                console.error("Error saving student:", error);
            }
        },
    });

    return (
        <>
            <Dialog
                headerTitle={editStudentId ? "Edit Student" : "New Student"}
                opened={dialogOpened}
                onOpenedChanged={({ detail }) => {
                    setDialogOpened(detail.value);
                }}
                footerRenderer={() => (
                    <>
                        <Button onClick={() => setDialogOpened(false)}>Cancel</Button>
                        <Button theme="primary" onClick={formik.submitForm}>
                            {editStudentId ? "Update" : "Add"}
                        </Button>
                    </>
                )}
            >
                <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label style={{ marginRight: "4px" }}>First name</label>
                        <span style={{ color: "red" }}>*</span>
                    </div>
                    <TextField
                        {...formik.getFieldProps("firstName")}
                    />
                    {
                        formik.touched.firstName && formik.errors.firstName ? 
                        (
                            <div style={{ color: "red" }}>{formik.errors.firstName}</div>
                        ) : null
                    }

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label style={{ marginRight: "4px" }}>Last name</label>
                        <span style={{ color: "red" }}>*</span>
                    </div>
                    <TextField
                        {...formik.getFieldProps("lastName")}
                    />
                    {
                        formik.touched.lastName && formik.errors.lastName ? 
                        (
                            <div style={{ color: "red" }}>{formik.errors.lastName}</div>
                        ) : null
                    }
                    <TextField
                        label="Age"
                        {...formik.getFieldProps("age")}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />

                    <TextField
                        label="Grade"
                        {...formik.getFieldProps("grade")}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />

                    <DatePicker
                        label="Date of birth"
                        {...formik.getFieldProps("dateOfBirth")}
                    />
                </VerticalLayout>
            </Dialog>
            <Button onClick={() => onAddNewStudent()}>Add Student</Button>
        </>
    );
}
