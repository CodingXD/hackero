import axios from "axios";

export type Comment = {
  id: number;
  created_at: string;
  created_at_i: number;
  type: string;
  author?: string;
  title: any;
  url: any;
  text?: string;
  points: any;
  parent_id: number;
  story_id: number;
  options: any[];
  children: Comment[];
};

type Post = {
  id: number;
  created_at: string;
  created_at_i: number;
  type: string;
  author: string;
  title: string;
  url: string;
  text: any;
  points: number;
  parent_id: any;
  story_id: any;
  children: Comment[];
  options: any[];
};

export default async function getPost(id: string): Promise<Post> {
  const { data } = await axios.get(`http://hn.algolia.com/api/v1/items/${id}`);
  return data;
}
