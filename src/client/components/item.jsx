import React from 'react';
import PropTypes from 'prop-types';

const Item = (props) => {
  return (
    <li className="sheetLine">
      <p>{props.query}</p>
      <dl>
        {Object.entries(props.result).map(([service, itmes]) =>
          <React.Fragment key={service}>
            <dt>{service}</dt>
            {itmes.map(
              (item, index) =>
                <dd key={service + index}>
                  {item.price + '円 : ' + item.title}
                </dd>
            )}
          </React.Fragment>
        )}
      </dl>
      {/* <button
        onClick={(e) => props.deleteButtonHandler(e, sheetIndex)}
      >X
      </button>
      <span
        onClick={(e) => props.clickSheetNameHandler(e, sheetName)}
        className={'sheetNameText ' + (isActiveSheet ? 'active-sheet' : '')}
      >{sheetName}
      </span> */}
    </li>
  );
};
export default Item;
Item.propTypes = {
  query: PropTypes.string,
  result: PropTypes.object,
};
