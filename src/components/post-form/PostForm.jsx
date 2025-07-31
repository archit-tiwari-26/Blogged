import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {Button,Input,RTE,Select} from '..'
import appwriteService from "../../appwrite/config"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setFilePreview(null);
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Form Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {post ? "Edit Post" : "Create New Post"}
                </h1>
                <p className="text-gray-400">
                    {post ? "Update your existing post" : "Share your thoughts with the world"}
                </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-8">
                {/* Main Content Area */}
                <div className="flex-1 min-w-0 space-y-6">
                    {/* Title Input */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 
                                    hover:border-gray-700/50 transition-all duration-300">
                        <Input
                            label="Title"
                            placeholder="Enter your post title..."
                            className="mb-0"
                            {...register("title", { required: true })}
                        />
                    </div>

                    {/* Slug Input */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 
                                    hover:border-gray-700/50 transition-all duration-300">
                        <Input
                            label="Slug"
                            placeholder="url-friendly-slug"
                            className="mb-0"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </div>

                    {/* Content Editor */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 
                                    hover:border-gray-700/50 transition-all duration-300">
                        <RTE 
                            label="Content" 
                            name="content" 
                            control={control} 
                            defaultValue={getValues("content")} 
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 space-y-6">
                    {/* Featured Image */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 
                                    hover:border-gray-700/50 transition-all duration-300">
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            Featured Image
                        </label>
                        
                        {/* Custom File Upload Area */}
                        <div className="relative">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !post })}
                                onChange={handleFileChange}
                            />
                            
                            {/* Upload UI */}
                            <div className={`
                                relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300
                                ${selectedFile || filePreview ? 'border-blue-500/50 bg-blue-500/5' : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'}
                            `}>
                                {selectedFile || filePreview ? (
                                    /* File Selected State */
                                    <div className="space-y-4">
                                        {filePreview && (
                                            <div className="relative group">
                                                <img 
                                                    src={filePreview} 
                                                    alt="Preview" 
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm text-green-400 font-medium">
                                                    {selectedFile?.name || 'Image selected'}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={clearFile}
                                                className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors duration-300"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Upload State */
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-300 font-medium">Click to upload image</p>
                                            <p className="text-gray-500 text-sm mt-1">PNG, JPG, JPEG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {post && (
                            <div className="mt-6">
                                <p className="text-sm text-gray-400 mb-3">Current Image:</p>
                                <div className="relative group overflow-hidden rounded-lg border border-gray-700/50">
                                    <img
                                        src={appwriteService.getFileView(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 
                                                 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                                                  transition-opacity duration-300" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Status Selection */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 
                                    hover:border-gray-700/50 transition-all duration-300">
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="mb-0"
                            {...register("status", { required: true })}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
                        <Button 
                            type="submit" 
                            bgColor={post ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-blue-500 to-purple-600"} 
                            className="w-full py-3 font-semibold text-white rounded-lg
                                     hover:shadow-lg hover:shadow-blue-500/25 
                                     active:scale-95 transition-all duration-300
                                     relative overflow-hidden group"
                        >
                            <span className="relative z-10">
                                {post ? "Update Post" : "Publish Post"}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent 
                                          translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </Button>
                    </div>

                    {/* Tips Section */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                                    backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                        <h3 className="text-blue-300 font-semibold mb-3">💡 Writing Tips</h3>
                        <ul className="text-sm text-gray-300 space-y-2">
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Use a compelling title to grab attention
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Keep your content engaging and well-structured
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Choose a high-quality featured image
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}