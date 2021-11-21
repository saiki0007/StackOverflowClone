import React from 'react';
import { Link } from 'react-router-dom';
import './related-tags.scss';
import Spinner from "../spinner";

const RelatedTags = ({ relatedTags, onMoreBtnClick, isShowAll, loading }) => {
  
  function getTagsToShow(count) {
    const tags = [];

    for (let i = 0; i < count; i++) {
      tags.push((
        <li key={relatedTags[i].name}>
          <Link 
          to={`/questions/tagged/${relatedTags[i].name}`} className="post-tag" rel="tag">
            {relatedTags[i].name}
          </Link>
          <span className="multiplier">
            <span>×</span>

            &nbsp;
            <span>{relatedTags[i].count}</span>
          </span>
        </li>
      ));
    }
    return tags;
  }
  
  return (
    <div className="related-tags">
        {
            loading ? <Spinner /> : (<>
                <h4>Related Tags</h4>
                <ul>
                    {isShowAll ? getTagsToShow(relatedTags.length) : getTagsToShow(10)}
                </ul>
                {
                    isShowAll ? null : <button onClick={onMoreBtnClick}>
                    more related tags
                    </button>
                }
                </>
            )
        }
    </div>
  );
};

export default RelatedTags;