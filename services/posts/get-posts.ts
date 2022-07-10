import axios from "axios";

type Post = {
  created_at: string;
  title: string | null;
  url: string | null;
  author: string;
  points: number | null;
  story_text: string | null;
  comment_text: string;
  num_comments: null;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id: number;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: {
    author: {
      value: string;
      matchLevel: string;
      matchedWords: any[];
    };
    comment_text: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    };
    story_title: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    };
    story_url: {
      value: string;
      matchLevel: string;
      matchedWords: any[];
    };
  };
};

export type Posts = {
  hits: Post[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
};

export default async function getPosts(query: string): Promise<Posts> {
  const { data } = await axios.get("http://hn.algolia.com/api/v1/search", {
    params: {
      query,
    },
  });
  return data;
}
