import React, { Component } from 'react';

class Copyright extends Component {
    render() {
        return (
        <footer className="Home-copyright">
            <p className="Text-big">
                by <a href="https://github.com/qub3x" rel="noopener noreferrer" target="_blank">Andrea Franchini
                </a> & <a href="https://github.com/YoDevil" rel="noopener noreferrer" target="_blank">Alessandro Astone</a>
            </p>
            <p className="Text-small">
                Wizards of the Coast, Dungeons & Dragons,
                and their logos are trademarks of Wizards
                of the Coast LLC in the United States and other countries.
                © 2015 Wizards. All Rights Reserved.
            </p>
            <p className="Text-small">
            This website is not affiliated with, endorsed, sponsored,
            or specifically approved by Wizards of the Coast LLC. This
            website may use the trademarks and other intellectual property
            of Wizards of the Coast LLC, which is permitted under Wizards' &nbsp;
            <a href="http://dnd.wizards.com/articles/features/fan-site-kit" rel="noopener noreferrer" target="_blank">Fan Site Policy</a>.
            Dungeons & Dragons® is a trademark of Wizards of the Coast.
            For more information about Wizards of the Coast or any of Wizards'
            trademarks or other intellectual property, please visit their website
            at <a href="http://www.wizards.com" rel="noopener noreferrer" target="_blank">www.wizards.com</a>.
            </p>
        </footer>
        )
    }
}

export default Copyright;