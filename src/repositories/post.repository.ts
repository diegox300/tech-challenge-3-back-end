// Import the Post model and Document type from mongoose
import Post from '../models/post.model' // Importing the Post model for database operations
import { Document } from 'mongoose' // Importing Document type from mongoose for type definition

// Define the PostType interface that extends Document from mongoose
interface PostType extends Document {
  title: string // Title of the post
  content: string // Content of the post
  img: string // Image of the post
  createdAt: Date // Creation date of the post
  updatedAt: Date // Last update date of the post
}

// Class representing the Post repository
export class PostRepository {
  // Asynchronous method to create a new post
  async createPost(post: {
    title: string // Title of the post to be created
    content: string // Content of the post to be created
    img?: string // Image of the post to be created
    userId: string // User ID of the post creator
  }): Promise<PostType> {
    // Create a new instance of the Post model with the provided data
    const newPost = new Post({
      ...post,
      user: post.userId, // Assigning the user ID to the post)
    })

    // Save the new post to the database
    await newPost.save()

    // Return the new post as PostType
    return newPost as PostType
  }

  public async getPostById(id: string): Promise<PostType | null> {
    // Find a post by its ID
    const postById = await Post.findById(id)

    // Return the found post or null if not found
    return postById as PostType | null
  }

  // Asynchronous method to find posts by user ID
  async findPostsByUserId(userId: string): Promise<PostType[]> {
    // Find posts by user ID
    return Post.find({ user: userId }).exec()
  }

  public async getAllPostsPagination(offset: number, limit: number) {
    // Assuming you are using an ORM like Mongoose
    const posts = await Post.find().skip(offset).limit(limit)
    const total = await Post.countDocuments()
    return { posts, total }
  }

  async findById(id: string): Promise<PostType | null> {
    // Finding a post by its ID with execution
    return Post.findById(id).exec() // Executing the query to find the post
  }

  public async getAllPosts(): Promise<PostType[]> {
    // Find all posts
    const posts = await Post.find()

    // Return the found posts
    return posts as PostType[]
  }

  // Asynchronous method to delete a post by ID
  public async deletePostById(id: string): Promise<PostType | null> {
    // Finding and deleting a post by its ID
    const deletedPost = await Post.findByIdAndDelete(id)
    return deletedPost as PostType | null // Returning the deleted post or null
  }

  // Asynchronous method to update a post by ID
  public async updatePostById(
    id: string,
    updateData: Partial<PostType>,
  ): Promise<PostType | null> {
    // Finding and updating a post by its ID with new data
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true, // Returning the updated post
    })
    return updatedPost as PostType | null // Returning the updated post or null
  }
}
