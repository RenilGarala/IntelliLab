import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";

import { useProblemStore } from "../store/useProblemStore";
const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  useEffect(() => {
    getProblemById(id);
    // getSubmissionCountForProblem(id);

  }, [id]);

  return (
    <div>
      {JSON.stringify(problem)}
    </div>
  );
};

export default ProblemPage;
