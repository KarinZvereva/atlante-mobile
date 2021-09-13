import React, {useCallback, useEffect, useState} from 'react';
import {Picker, PickerProps} from '@react-native-picker/picker';
import {IDalR, ILookupRepositoryDTO} from '../dalFactory';
import {View} from 'react-native';

export interface IPickerItem {
  label?: string;
  value: any;
}

export type RemotePickerProps<E extends {value: string}> = PickerProps & {
  reader?: IDalR<E>;
  remoteFilter?: object | ILookupRepositoryDTO;
};

export const basePickerBuilder = (
  items: IPickerItem[],
): React.FC<PickerProps> => {
  return function MyPicker(props: PickerProps) {
    return (
      <Picker {...props}>
        {items.map((i) => (
          <Picker.Item label={i.label} value={i.value} />
        ))}
      </Picker>
    );
  };
};

export const remotePickerBuilder = <E extends {value: string}>(
  dal: IDalR<E>,
): React.FC<RemotePickerProps<E>> => {
  return function MyRemotePicker(props: RemotePickerProps<E>) {
    const {reader, remoteFilter, ...pickerProps} = props;
    const [items, setItems] = useState<IPickerItem[]>();
    const [dataReader, setDataReader] = useState<IDalR<E>>(reader || dal);

    const loadDataClbk = useCallback(async () => {
      try {
        const result = await dataReader.get<E[]>(remoteFilter);
        if (result && result.data)
          setItems(result.data.map((r) => ({label: r.value, value: r.value})));
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    }, [dataReader, remoteFilter]);

    useEffect(() => {
      setDataReader(dataReader);
    }, [reader]);

    useEffect(() => {
      loadDataClbk();
    }, [loadDataClbk]);

    useEffect(() => {
      loadDataClbk();
    }, []);

    return (
      <View style={{width: '100%'}}>
        {items && (
          <Picker {...pickerProps}>
            <Picker.Item key={-1} label={'---'} value={undefined} />
            {items.map((i, index) => (
              <Picker.Item
                key={index}
                label={i.label}
                value={i.value}
                fontFamily="Novecentosanswide-Normal"
              />
            ))}
          </Picker>
        )}
      </View>
    );
  };
};
