import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import "@/app/ui/styles/forms/formModels.scss";

import AlbumSVG from "@/app/ui/icons/record.svg";
import SingleSVG from "@/app/ui/icons/single-icon.svg";
import ArtistSVG from "@/app/ui/icons/user.svg";
import CompilationSVG from "@/app/ui/icons/collection-icon.svg";
import ArticleSVG from "@/app/ui/icons/article.svg";
import TrackSVG from "@/app/ui/icons/song.svg";
import AddSVG from "@/app/ui/icons/fat-plus.svg";

const options = [
  { label: 'Album', icon: AlbumSVG, option1: "One artist", option2: "Multiple songs", option3: "One cover", value: 'album' },
  { label: 'Single', icon: SingleSVG, option1: "One artist", option2: "One song", option3: "One cover", value: 'single' },
  { label: 'Compilation', icon: CompilationSVG, option1: "Multiple artist", option2: "Multiple songs", option3: "Multiple covers", value: 'compilation' },
  { label: 'Artist', icon: ArtistSVG, option1: "Basic artist info", option2: "Add artist albums", option3: "Add artist details", value: 'artist' },
  { label: 'Article', icon: ArticleSVG, option1: "Create new article", option2: "Add article info", option3: "Quote other models", value: 'article' },
  { label: 'Track', icon: TrackSVG, option1: "Basic track info", option2: "Add track lyrics", option3: "Add track details", value: 'track' },
];

interface FormChooseModelProps {
  handleSelect: (type: string) => void;
}

function FormChooseModel({ handleSelect }: FormChooseModelProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  return (
    <div className='creation-form-component form-desktop'>
      <div className='creation-form-wrapper'>
        <div className='form-title'>Create new model</div>
        <hr className='splitting-line' />
        <div className='form-block' ref={viewportRef}>
          {options.map(({ label, value, option1, option2, option3, icon: Component }, index) => (
            <div className='form-create-option' key={index}>
              <div className='option-title' onClick={() => handleSelect(value)}>
                {label}
              </div>
              <hr className='splitting-line' />
              <div className='option-description'>
                <div className='option-icon' onClick={() => handleSelect(value)}>
                  {<Component />}
                </div>
                <div className='option-text'>
                  <span>{option1}</span>
                  <span>{option2}</span>
                  <span>{option3}</span>
                </div>
              </div>
              <button className='option-btn' onClick={() => handleSelect(value)}>
                <AddSVG />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default FormChooseModel;