import { Link } from "react-router-dom";

const Post = () => {
    return (
    <div>
        <h1>Welcome to the Capstone Community</h1>
        <h2 className='font-bold text-2xl'>Create Post</h2>
            <form onSubmit={onCreatePost}>
                <div className='mb-3'>
                    <label className='block'>Title: </label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border border-black-400 w-1/2 p-1'
                        placeholder='Title'
                    />
                </div>
                <div className='mb-3'>
                    <label className='block'>Description: </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='border border-black-400 w-1/2 p-1'
                        placeholder='description'
                    ></textarea>
                </div>
                <div className='mb-3'>
                    <button
                        type='submit'
                        className='bg-purple-500 text-white px-3 py-1'
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
        );
}

export default Post;