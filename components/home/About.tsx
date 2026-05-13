import Image from 'next/image';

export default function AboutComponent({ }) {

    return (
        <div className="about-section section-gap">
            <h2 className="subtitle">About me</h2>
            <div className="about-wrapper">
                <div className="photoWrapper">
                    <div className="photo">
                        <Image 
                            src={'/images/photo.jpeg'}
                            width={1065}
                            height={710}
                            alt="Tommy Saputra"
                            priority
                        />
                    </div>
                </div>
                <div className="about-desc">
                    <h3 className="subsubtitle">Tommy Saputra</h3>
                    <h4 className="subsubsubtitle">Software Engineer</h4>
                    <p className="paragraph">Based in Sydney, Australia.</p>
                    <p className="paragraph">I am a collaborative team player who values clear communication and feedback. Also, a highly organised person who can manage multiple projects simultaneously while maintaining attention to detail and meeting deadlines.</p>
                </div>
            </div>
        </div>
    )
}
