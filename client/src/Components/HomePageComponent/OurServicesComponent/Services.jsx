import React from "react";

export default function Services() {
  return (
    <div class="fandt">
      <div class="container">
        <div class="col-md-6 features">
          <h3>Our Services</h3>
          <div class="support">
            <div class="col-md-2 ficon hvr-rectangle-out">
              <i class="fa fa-user " aria-hidden="true"></i>
            </div>
            <div class="col-md-10 ftext">
              <h4>24/7 online free support</h4>
              <p>
                Praesent rutrum vitae ligula sit amet vehicula. Donec eget
                libero nec dolor tincidunt vulputate.
              </p>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="shipping">
            <div class="col-md-2 ficon hvr-rectangle-out">
              <i class="fa fa-bus" aria-hidden="true"></i>
            </div>
            <div class="col-md-10 ftext">
              <h4>Free shipping</h4>
              <p>
                Praesent rutrum vitae ligula sit amet vehicula. Donec eget
                libero nec dolor tincidunt vulputate.
              </p>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="money-back">
            <div class="col-md-2 ficon hvr-rectangle-out">
              <i class="fa fa-money" aria-hidden="true"></i>
            </div>
            <div class="col-md-10 ftext">
              <h4>100% money back</h4>
              <p>
                Praesent rutrum vitae ligula sit amet vehicula. Donec eget
                libero nec dolor tincidunt vulputate.
              </p>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="col-md-6 testimonials">
          <div class="test-inner">
            <div
              class="wmuSlider example1 animated wow slideInUp"
              data-wow-delay=".5s"
            >
              <div class="wmuSliderWrapper">
                <article style={{position: "absolute", width: "100%", opacity: '0'}}>
                  <div class="banner-wrap">
                    <img src="images/c1.png" alt=" " class="img-responsive" />
                    <p>
                      Nam elementum magna id nibh pretium suscipit varius
                      tortor. Phasellus in lorem sed massa consectetur
                      fermentum. Praesent pellentesque sapien euismod.
                    </p>
                    <h4># Andrew</h4>
                  </div>
                </article>
                <article style={{position: "absolute", width: "100%", opacity: '0'}}>
                  <div class="banner-wrap">
                    <img src="images/c2.png" alt=" " class="img-responsive" />
                    <p>
                      Morbi semper, risus dignissim sagittis iaculis, diam est
                      ornare neque, accumsan risus tortor at est. Vivamus auctor
                      quis lacus sed interdum celerisque.
                    </p>
                    <h4># Lucy</h4>
                  </div>
                </article>
                <article style={{position: "absolute", width: "100%", opacity: '0'}}>
                  <div class="banner-wrap">
                    <img src="images/c3.png" alt=" " class="img-responsive" />
                    <p>
                      Fusce non cursus quam, in hendrerit sem. Nam nunc dui,
                      venenatis vitae porta sed, sagittis id nisl. Pellentesque
                      celerisque eget ullamcorper vehicula.{" "}
                    </p>
                    <h4># Martina</h4>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <script src="js/jquery.wmuSlider.js"></script>
      <script>$('.example1').wmuSlider();</script>
    </div>
  );
}
