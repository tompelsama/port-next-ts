"use client"

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { IndexInfo } from "typescript";

gsap.registerPlugin(ScrollTrigger); 

interface Props {
    companies: object[];
    title: string;
}

export default function CompaniesComponent({ companies = [], title = "Work Experience" }:Props) {

    const tilesRef = useRef<any>([])

    useEffect(() =>
    {
        const tiles = tilesRef.current
        let delay = 0

        tiles.forEach((tile: gsap.DOMTarget, i: IndexInfo) => {
            const anim = gsap.fromTo(
                tile, 
                { 
                    autoAlpha: 0, 
                    y: 50 
                }, 
                { 
                    duration: 0.3,
                    delay,
                    autoAlpha: 1, 
                    y: 0 
                }
            );
            
            ScrollTrigger.create({
                trigger: tile,
                animation: anim,
                start: 'center bottom'
            });

            delay += 0.3
        });

    }, [])

    return (
        <div className="companies-section section-gap">
            <h2 className="subtitle">{title}</h2>
            <div className="company">
                { companies.map(({id, name, link, position, description}: any, index) => 
                    <div 
                        className="company-wrapper" 
                        key={ id } 
                        ref={el => { tilesRef.current[index] = el }}
                    >
                        <p className="company-order">{ `0${id}` }</p>
                        <p className="company-detail">
                            { (link !== null) ? <a className='link company-detail-name' target="_blank" href={link}>{ `${name}`}</a> : <span className='company-detail-name'>{ `${name}`}</span> } 
                            { `, ${position}` }
                        </p>
                        <p className="company-description">{ `${description}` }</p>
                    </div>
                ) }
            </div>
        </div>
    )
}
