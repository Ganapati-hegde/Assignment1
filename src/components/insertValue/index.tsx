
import { useState } from 'react';
import Heading from '../heading'
import './style.css'
import SelectShape from '../selectShape'
import Result from '../result';
import Button from '../button';
import InputField from '../inputField'

interface Props {
    selected: string
}

function InsertValue({ selected }: Props) {
    const [result, setResult] = useState(false)
    const [selectShape, setSelectShape] = useState(false)
    const [area, setArea] = useState(0)

    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)

    const [diameter, setDiameter] = useState(0)
    const [side, setSide] = useState(0)

    const [xAxis, setXAxis] = useState(0)
    const [yAxis, setYAxis] = useState(0)


    const renderInputFields = (selectedShape: string) => {
        let inputFields: any = {
            'Rectangle': function () {
                return (
                    <>
                        <InputField field='Length' value={length} onInputChange={setLength} />
                        <InputField field='Width' value={width} onInputChange={setWidth} />
                    </>
                )
            },
            'Circle': function () {
                return <InputField field='Diameter' value={diameter} onInputChange={setDiameter} />
            },
            'Square': function () {
                return <InputField field='Side' value={side} onInputChange={setSide} />
            },
            'Ellipse': function () {
                return (<>
                    <InputField field='Major Axis' value={xAxis} onInputChange={setXAxis} />
                    <InputField field='Minor Axis' value={yAxis} onInputChange={setYAxis} />
                </>)
            }
        };
        return inputFields[selectedShape]();
    }
    const onPressNext = () => {
        setResult(true);
        var areaOfTheShape: number = calculateArea();
        setArea(areaOfTheShape);
    }

    const calculateArea = () => {
        let shapes: any = {
            'Rectangle': function () {
                return length * width
            },
            'Circle': function () {
                let radius: number = diameter / 2
                return Math.PI * radius * radius;
            },
            'Square': function () {
                return side * side;
            },
            'Ellipse': function () {
                return Math.PI * xAxis * yAxis
            }
        };
        return shapes[selected]();
    }
    const onPressCancel = () => {
        setSelectShape(true);
        setResult(false)
    }

    return (
        <>
            {!result && !selectShape ?
                <>
                    <Heading step={2} title='Insert your values'></Heading>
                    <div className='mTop-16 mBottom-32'>You have selected a <span className='bold-font'>{selected}</span>, please input the required variables</div>

                    {renderInputFields(selected)}

                    <div className='button-wrapper flex flex-center'>
                        <Button onPress={onPressNext} text='Go to step 3' />
                        <span className="mHorizontal-16">or</span>
                        <Button onPress={onPressCancel} text='Cancel' />
                    </div>
                </>
                : result ?
                    <Result selected={selected} area={area} /> :
                    <SelectShape />}
        </>
    );
}

export default InsertValue;
