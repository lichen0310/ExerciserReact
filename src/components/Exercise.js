import React, {Component} from 'react';
import '../css/Exercise.css'
import {FormattedMessage} from 'react-intl';
import {QUESTIONS, BEST_SCORE, MCQ, REORDER_LIST, CLOZE_TEXT} from "../containers/translation";


class Exercise extends Component {

    constructor(props) {
        super(props);
        const {id, types} = this.props;

        this.state = {
            id: id,
        }

    }

    playExercise = () => {
        this.props.onPlay(this.state.id);
    };

    editExercise = () => {
        this.props.onEdit(this.state.id);
    };

    deleteExercise = () => {
        this.props.onDelete(this.state.id);
    };

    shareExercise = () => {
        this.props.onShare(this.state.id, !this.props.shared);
    };

    result = () => {
        this.props.presenceResult(this.state.id)
    };

    render() {
        const {title, type, questions, scores, answers, list, isShared, isHost, shared} = this.props;

        let highest = 0;
        if (scores.length > 0) {
            scores.map((score) => {
                if (highest < score) highest = score;
            })
        }

        let play = (<button type="button" className="play-button" onClick={this.playExercise}/>);
        let edit = (<button type="button" disabled={shared} className="edit-button" onClick={this.editExercise}/>);
        let cross = (<button type="button" disabled={shared} className="delete-button float-right" onClick={this.deleteExercise}/>);
        let share = "";
        let results = "";

        if (isShared && !isHost) {
            edit = "";
            cross = "";
        }

        if (isShared && isHost) {
            let bg = "non-shared-exercise";
            if (shared) {
                bg = "shared-exercise";
                results = (<button type="button" className={"result-button"} onClick={this.result}/>);
            }
            share = (<button type="button" className={"share-button " + bg} onClick={this.shareExercise}/>);
        }


        let length = 0;
        let localized_type="";

        if (type === "MCQ") {
            length = questions.length;
            localized_type= MCQ;
        }
        if (type === "CLOZE") {
            length = answers.length;
            localized_type= CLOZE_TEXT;
        }
        if (type === "REORDER") {
            length = list.length;
            localized_type= REORDER_LIST;
        }

        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="exercise-card-content">
                        <h3 className="card-title">{title}</h3>
                        <p><FormattedMessage id={QUESTIONS} values={{number: length}}/></p>
                        <p><FormattedMessage id={localized_type}/></p>
                        <p><FormattedMessage id={BEST_SCORE}/>:{highest}</p>
                        {play}
                        {edit}
                        {cross}
                        {share}
                        {results}
                    </div>
                </div>
            </div>
        );
    }

}

export default Exercise;