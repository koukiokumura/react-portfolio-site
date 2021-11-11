import Circle from 'react-circle'
import { requestStates } from '../constans'
import { useSkills } from '../customHooks/useSkills'

export const Skills = () => {
  const [sortedLanguageList, fetchRequestState, converseCountToPercentage] = useSkills()

  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            fetchRequestState === requestStates.loading && (
              <p className="description">取得中...</p>
            )
          }
          {
            fetchRequestState === requestStates.success && (
              sortedLanguageList().map((item, index) => (
                <div className="skill-item" key={index}>
                  <p className="description">
                    <strong>{item.language}</strong>
                  </p>
                  <Circle
                    animate
                    progress={converseCountToPercentage(item.count)}
                  />
                </div>
              ))
            )
          }
          {
            fetchRequestState === requestStates.loading && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  )
}


/**
 * Circleコンポーネント仕様
 * propsにtrueを渡したい時はanimateなどのようにprops名だけを表示させるだけでOK
 * // All avaliable props for customization(illustrated by default values):
// Details are ordered as: `<Type>: <Description>`
<Circle
  animate={true} // Boolean: Animated/Static progress
  animationDuration="1s" // String: Length of animation
  responsive={false} // Boolean: Make SVG adapt to parent size
  size="100" // String: Defines the size of the circle.
  lineWidth="25" // String: Defines the thickness of the circle's stroke.
  progress="0" // String: Update to change the progress and percentage.
  progressColor="rgb(76, 154, 255)" // String: Color of "progress" portion of circle.
  bgColor="#ecedf0" // String: Color of "empty" portion of circle.
  textColor="#6b778c" // String: Color of percentage text color.
  textStyle={{
    font: 'bold 4rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
  }}
  percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
  roundedStroke={false} // Boolean: Rounded/Flat line ends
  showPercentage={true} // Boolean: Show/hide percentage.
  showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
/>
 */
