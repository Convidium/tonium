'use client'
import { useRouter } from 'next/navigation';
import React, { Component } from 'react';
import "@/app/ui/styles/forms/formMain.scss";
import "@/app/ui/styles/forms/formModels.scss";
import AlbumSVG from "@/app/ui/icons/record.svg";
import SingleSVG from "@/app/ui/icons/single-icon.svg";
import ArtistSVG from "@/app/ui/icons/user.svg";
import CompilationSVG from "@/app/ui/icons/collection-icon.svg";
import ArticleSVG from "@/app/ui/icons/article.svg";
import TrackSVG from "@/app/ui/icons/song.svg";
import AddSVG from "@/app/ui/icons/fat-plus.svg";
import FormChooseModel from '../components/FormCreation/FormChooseModel';

const options = [
  { label: 'Album', icon: AlbumSVG, option1: "One artist", option2: "Multiple songs", option3: "One cover", value: 'album' },
  { label: 'Single', icon: SingleSVG, option1: "One artist", option2: "One song", option3: "One cover", value: 'single' },
  { label: 'Compilation', icon: CompilationSVG, option1: "Multiple artist", option2: "Multiple songs", option3: "Multiple covers", value: 'compilation' },
  { label: 'Artist', icon: ArtistSVG, option1: "Basic artist info", option2: "Add artist albums", option3: "Add artist details", value: 'artist' },
  { label: 'Article', icon: ArticleSVG, option1: "Create new article", option2: "Add article info", option3: "Quote other models", value: 'article' },
  { label: 'Track', icon: TrackSVG, option1: "Basic track info", option2: "Add track lyrics", option3: "Add track details", value: 'track' },
]

function CreatePage() {
  const router = useRouter();

  const handleSelect = (type: string) => {
    router.push(`/create/${type}`)
  }

  return (
    <FormChooseModel handleSelect={handleSelect}/>
  )
}

export default CreatePage