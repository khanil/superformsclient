import React, { Component, PropTypes } from 'react';
import * as BEM from './classes';

const ASC = 0;
const DESC = 1;

export default class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: undefined
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    const {sort, id, sortFn} = this.props;
    if (sort !== undefined && sortFn !== undefined) {
      sort(id, sortFn);

      this.setState(({sort}) => ({
        sort: (sort === undefined) ? ASC
                                   : (sort + 1) % 2
      }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.usingForSort === true && nextProps.usingForSort === false) {
      this.setState({
        sort: undefined
      });
      return;
    }
  }

  render() {
    const {
      classes = '',
      usingForSort,
      value
    } = this.props;

    const th_classes = !usingForSort ? 
                       '':
                        this.state.sort === ASC ?
                        'th_sort_asc':
                        'th_sort_desc';

    const sortable = this.props.sort !== undefined;

    return (
      <th
        className={`${BEM.COLUMN} ${th_classes} ${classes}` + (sortable ?
                                                               BEM.COLUMN_CLICKABLE :
                                                               '')}
        title={usingForSort ? 'Отсортировано по ' + (this.state.sort === ASC ?
                                                    'возрастанию':
                                                    'убыванию')
                            : null}
        onClick={sortable ? this.clickHandler : null}
      >
        {value}
        {
          usingForSort ?
          <i
            className={'pull-right fa fa-sort-' + (this.state.sort === ASC ? 'asc' : 'desc')}
            aria-hidden='true'
          ></i>:
          null
        }
      </th>
    );
  }
}

Column.propTypes = {
  
}