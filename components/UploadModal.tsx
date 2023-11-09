"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";

import Input from "./Input";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import uniqid from "uniqid";

const UploadModal = () => {

    const { user } = useUser();

    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: "",
            image: "",
        }
    });
    
    const [isLoading, setIsLoading] = useState(false)
    
    const uploadModal = useUploadModal();

    const onChange = (open: boolean) => {
        if(!open) {
            reset();
            uploadModal.onClose();
        }
    }


    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // upload to DB

        try {
            setIsLoading(true);
            const imgFile = values.image?.[0]
            const songFile = values.song?.[0]

            if(!imgFile || !songFile || !user ) {
                toast.error("Fill out all fields")
                return
            }

            const uniqId = uniqid();

        } catch(error) {
            toast.error("Error, try again later!");
        } finally {
            setIsLoading(false);
        }
        
        
    }
    
    
    return (
        <Modal 
            title="Add a song"
            description="Upload a 'mp3' file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-3"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder="song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", { required: true })}
                    placeholder="song author"
                />
                <div>
                    <div className="
                        pb-1
                    ">
                        Upload a Song
                    </div>
                    <Input
                        id="song"
                        type="file"
                        accept=".mp3"
                        disabled={isLoading}
                        {...register("song", { required: true })}
                    />
                    <div className="
                        pb-1
                    ">
                        Upload an Image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                        {...register("image", { required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">Create</Button>
            </form>
        </Modal>
    )
}


export default UploadModal;