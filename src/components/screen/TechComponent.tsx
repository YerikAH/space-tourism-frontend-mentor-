import React, { useContext, useEffect, useState } from "react";
import {TECH_INITIAL_STATE} from "../../constant/initialState";
import {TECH_OPTIONS} from "../../constant/optionsInitialState";
import FetchContext from "../../context/fetchContext";
import {changeTrueValue} from "../../helpers/changeTrueValue";
import {Tech} from "../../interface/data";
import {Options} from "../../interface/options";
import {BgGround, DivGridOne, DivGridTwo, MainStyle, SectionStyle} from "../../styles/tech_styles";
import NavegatorComponent from "../NavegatorComponent";
import TechInfo from "../tech/TechInfo";
import TechImage from "../tech/TechImage";
import TeachNav from "../tech/TechNav";

export default function TechComponent() {
  
  const dataContext = useContext(FetchContext);
  const [data, setData] = useState<Tech>(TECH_INITIAL_STATE);
  const [options, setOptions] = useState<Options[]>(TECH_OPTIONS);
  const [style, setStyle] = useState(false);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const getValue: string = (e.target as HTMLButtonElement).value;
    selectOption(getValue);
    changeData(getValue);
  };

  function changeData(getValue?: string) {
    const value = getValue === undefined ? "launch vehicle" : getValue;

    const tech: Tech[] = dataContext.tech;
    let objMoon: Tech | undefined = tech.find((item) => item.name === value);
    if (objMoon === undefined) {
      objMoon = TECH_INITIAL_STATE;
    }
    setData(objMoon);
    setStyle(!style);
  }

  function selectOption(option: string) {
    const menuObj = changeTrueValue(options, option);
    setOptions(menuObj);
  }

  useEffect(() => {
    selectOption("launch vehicle");
    changeData();
  }, [dataContext]);
  return (
    <FetchContext.Provider value={dataContext}>
      <BgGround/>
      <NavegatorComponent />
      <MainStyle>
	<SectionStyle>
	  <DivGridOne>
	    <TechImage image_path_mobile={data.image_path_mobile} description={data.description} name={data.name} image_path_desktop={data.image_path_desktop} />
	    <TeachNav options={options} handleClick={handleClick}/>
	  </DivGridOne>
	  <DivGridTwo>
	    <TechInfo  image_path_mobile={data.image_path_mobile} description={data.description} name={data.name} image_path_desktop={data.image_path_desktop} />
	  </DivGridTwo>
	</SectionStyle>
      </MainStyle>
    </FetchContext.Provider>
  );	
}
