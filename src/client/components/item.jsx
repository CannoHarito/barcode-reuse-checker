import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Row, Col } from 'muicss/react';

const itemPiece = (service, price, title) =>
  (<Row key={service + title} className="mui--divider-bottom" >
    <Col xs="6" md="3" >{service}</Col>
    <Col xs="6" md="3" >{price}</Col>
    {title && <Col xs-offset="1" md-offset="0" xs="11" md="6" >{title}</Col>}
  </Row>);

const Item = (props) => {
  const list = [];
  Object.entries(props.result).forEach(([service, items]) => {
    if (items.length === 0) list.push(itemPiece(service, 'No match.'));
    else {
      items.forEach((i) =>
        list.push(itemPiece(service, i.price + '円', i.title)));
    }
  });

  return (
    <Panel>
      <p>{props.query}</p>
      {list}
    </Panel>
  );
};
export default Item;
Item.propTypes = {
  query: PropTypes.string,
  result: PropTypes.object,
};
