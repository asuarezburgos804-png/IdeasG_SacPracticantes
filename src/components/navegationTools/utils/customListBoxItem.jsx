import React from 'react';
import { ListboxItem } from '@nextui-org/react';

const CustomListboxItem = ({ item, additionalContent }) => {
    console.log('hola estamos aqu´pi');
    return(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ListboxItem aria-label={item.nombre_supergrupo} style={{ display: 'flex', justifyContent: 'space-between' }}>
          {item.nombre_supergrupo}
        </ListboxItem>
        <div style={{ fontSize: 'small', color: 'gray', marginTop: '4px' }}>
          {additionalContent}
        </div>
      </div>
    )
};

export default CustomListboxItem;