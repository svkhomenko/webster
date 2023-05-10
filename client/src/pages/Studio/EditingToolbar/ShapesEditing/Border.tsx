import { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Switch,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { SketchPicker, ColorResult } from 'react-color';
import useStageObject from '~/hooks/use-stage-object';
import { getRGBAString } from '~/utils/get-rgba-string';
import { StageObjectData } from '~/types/stage-object';

type IProps = {
  selectedObject: StageObjectData;
};

const INIT_BORDER_COLOR = '#000000';
const INIT_BORDER_WIDTH = 5;

const Border = ({ selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const [isBorder, setIsBorder] = useState(selectedObject.stroke && selectedObject.strokeWidth);
  const [borderWidth, setBorderWidth] = useState(
    selectedObject.strokeWidth ? selectedObject.strokeWidth : INIT_BORDER_WIDTH,
  );
  const [borderColor, setBorderColor] = useState(selectedObject.stroke ? selectedObject.stroke : INIT_BORDER_COLOR);

  const handleIsBorderChange = () => {
    setIsBorder(!isBorder);

    let stroke;
    let strokeWidth;

    if (!isBorder) {
      stroke = INIT_BORDER_COLOR;
      strokeWidth = INIT_BORDER_WIDTH;
    } else {
      strokeWidth = 0;
    }

    updateOne({
      id: selectedObject.id,
      data: { stroke, strokeWidth },
    });
  };

  const handleBorderWidthChange = (w: number) => {
    setBorderWidth(w);

    updateOne({
      id: selectedObject.id,
      data: { strokeWidth: w },
    });
  };

  const handleSolidColorChange = (c: ColorResult) => {
    const rgbaC = getRGBAString(c.rgb);
    setBorderColor(rgbaC);

    updateOne({
      id: selectedObject.id,
      data: { stroke: rgbaC },
    });
  };

  return (
    <Menu>
      <MenuButton as={Button}>Border</MenuButton>
      <MenuList paddingX="10px">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="border-switch">Border</FormLabel>
          <Switch id="border-switch" isChecked={isBorder} onChange={handleIsBorderChange} />
        </FormControl>

        {isBorder && (
          <>
            <FormControl>
              <FormLabel htmlFor="border-width-slider" fontWeight="normal">
                Border width:
              </FormLabel>
              <Slider
                id="border-width-slider"
                aria-label="border-width-slider"
                value={borderWidth}
                min={1}
                max={selectedObject.width}
                onChange={handleBorderWidthChange}
              >
                <SliderTrack />
                <SliderThumb />
              </Slider>
            </FormControl>

            <SketchPicker color={borderColor} onChangeComplete={handleSolidColorChange} />
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default Border;