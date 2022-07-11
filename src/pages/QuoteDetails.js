import { Fragment, useEffect } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning React is fun!" },
  { id: "q2", author: "Maximilian", text: "Learning React is great!" },
];

const QuoteDetails = () => {
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found</p>;
  }

  const loadComments = (
    <div className="centered">
      <Link className="btn--flat" to="comments">
        Comments
      </Link>
    </div>
  );

  return (
    <Fragment>
      <HighLightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route path="comments" element={<Comments />} />
        <Route path="/" element={loadComments} />
      </Routes>
    </Fragment>
  );
};

export default QuoteDetails;
