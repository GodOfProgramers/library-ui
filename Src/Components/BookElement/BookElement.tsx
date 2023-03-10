/* eslint-disable @next/next/no-img-element */
import { BookElementProps } from "./BookElement.props";
import styles from './BookElement.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import Star from "./Star.svg"
import { useSelector } from "react-redux";

import { IAuthor } from "../../store/models/IAuthor";
import { IGenre } from "../../store/models/IGenre";
import { ILanguage } from "../../store/models/ILanguage";
import { RootState } from "../../store/store";
import { attributesAPI } from "../../services/BookAttributesService";
import { useMemo } from "react";
import { Link } from "react-router-dom";


export const BookElement = ({className, Book,  ...props}: BookElementProps) => {
    const {data: genres} = attributesAPI.useFetchGenresQuery();
    const {data: authors} = attributesAPI.useFetchAuthorsQuery();
    const {data: languages}= attributesAPI.useFetchLanguageQuery();
    const author = useMemo(() => authors && authors.filter((author) => Book.authorId.includes(author.id)), [authors, Book.authorId])
    const genre = useMemo(() => genres && genres.filter((genre) => Book.genreId.includes(genre.id)), [Book.genreId, genres])
    const language = useMemo(() => languages && languages.find((language) => language.id == Book.languageId), [languages, Book.languageId])
    return(
        <Link to = {"Book/" + Book.id}>
        <div  {...props}>
            
                <Row className= {cn(styles.bookelement, className)}>
                    <Col md ={2} className = {styles.img}  >
                        {Book.coverImage ? <BookCover coverImage={Book.coverImage}/> : <img src = {"blank.png"} alt = "None" width = {"100px"}></img>}
                        
                    </Col>
                    <Col md ={7} className = {styles.text}  >
                        <Row className = {styles.title} >
                            <h3 >{Book.title}</h3>
                        </Row>
                        <Row >
                            <p className = {styles.author}>{author ? author.map(item => item.name).join(', ') : "N/A"}</p>
                        </Row>
                        <Row >
                            <span>Genre: </span>&nbsp;<span className = {styles.genre}>{genre ? genre.map(item => item.name).join(', ') : "N/A"}</span>
                            
                        </Row>
                        <Row >
                            <span>Language: </span>&nbsp;<span className = {styles.genre}>{language ? language.name: "unknown"}</span>
                        </Row>

                        <Row >
                            <p className = {styles.description}>{Book.description}</p>
                        </Row>
                        <Row >
                            <p className = {styles.description}>Available: {Book.numberAvailable}/{Book.number}</p>
                        </Row>

                        
                    </Col>
                    <Col md ={3} className = {styles.rating}>


                    </Col>
                </Row>
            

        </div>
        </Link>
    )
}

const BookCover = ( {coverImage, ...props}: {coverImage: Buffer, width?: number, height?: number, className?: string, onClick? : (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;} ) => {
    return (
      <img
        alt="Book cover"
        src={`data:image/jpeg;base64,${coverImage.toString('base64')}`} width = {"100px"} {...props}
      />
    );
  };