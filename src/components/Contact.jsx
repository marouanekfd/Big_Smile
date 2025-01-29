import React from 'react';

const Contact = () => {
  return (
    <div id="contact">
      <h1>contact</h1>
      <table>
        <tr>
          <td>
            <div id="inner_div">
              <table id="inner_table">
                <tr>
                  <td><i className="fas fa-phone"></i> &nbsp; +1 234 567 8910</td>
                </tr>
                <tr>
                  <td><i className="fas fa-at"></i> &nbsp; yourname@email.com</td>
                </tr>
                <tr>
                  <td><i className="fas fa-fax"></i> &nbsp; +1 234 567 8910</td>
                </tr>
                <tr>
                  <td><i className="fas fa-map-marker-alt"></i>
                    <div id="address">
                      Street 123,<br />
                      blah blah city,<br />
                      blah blah country
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a className="social"><i className="fab fa-facebook"></i></a>
                    <a className="social"><i className="fab fa-twitter"></i></a>
                    <a className="social"><i className="fab fa-instagram"></i></a>
                    <a className="social"><i className="fab fa-dribbble"></i></a>
                    <a className="social"><i className="fab fa-medium"></i></a>
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td>
            <form>
              <input type="text" placeholder="name" required />
              <input type="email" placeholder="email" required /><br />
              <textarea placeholder="your message" required rows="5"></textarea><br />
              <button className="btn_one">send</button>
            </form>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Contact;