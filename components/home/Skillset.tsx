"use client"

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); 

interface Props {
    skills: object[];
    title: string;
}

export default function Skillset({ skills = [], title = "Work Experience" }: Props) {

    const skillsRef = useRef<any>([])

    useEffect(() =>
    {
        const tiles = skillsRef.current
        let delay = 0

        tiles.forEach((tile: gsap.DOMTarget, i: number) => {
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
            
            delay += 0.1
        });

    }, [])

    return (
        <div className="skills-section section-gap">
            <div className="skills-desc">
                <h2 className="subtitle">{title}</h2>
                <p>I possess both technical and non-technical skills, making me the ideal candidate to consider for a comprehensive project. I am confident in my ability to tackle any challenge and meet your specific needs, regardless of what they may be.</p>
            </div>
           
            <ul className="skills">
                { skills.map(({id, name, description, icon}: any, index) => 
                    <li 
                        className="skill-wrapper" 
                        key={ id }
                        ref={el => { skillsRef.current[index] = el }}
                    >
                        <div className="skill-icon">
                            <Image 
                                src={icon}
                                width={60}
                                height={60}
                                alt={name}
                                className="skill-icon-style"
                            />
                        </div>
                        <div className="skill-desc">
                            <p className="skill-desc-name">{name}</p>
                            <p className="skill-desc-blurb">{description}</p>
                        </div>
                    </li>
                ) }
            </ul>
        </div>
    )
}
