# Cognitive Skills & Student Performance Dashboard 🧠📊

A comprehensive full-stack application for analyzing and visualizing student cognitive skills and academic performance, powered by AI-driven insights and machine learning models.

## 🌟 Features

### 📊 Dashboard Analytics
- **Performance Overview**: Real-time statistics and key metrics
- **Interactive Charts**: Class performance, attention analysis, and learning personas
- **Student Data Table**: Searchable and sortable student information
- **Key Insights**: AI-generated findings from cognitive analysis

### 🎯 AI-Powered Analysis
- **Individual Student Analysis**: Detailed cognitive profile assessment
- **Predictive Scoring**: ML-based assessment score prediction
- **Learning Personas**: K-means clustering for student categorization
- **Personalized Recommendations**: OpenAI-powered study strategies

### 🔬 Machine Learning Backend
- **Python Analysis**: Comprehensive data processing and EDA
- **Predictive Models**: Linear regression for score prediction
- **Clustering Algorithm**: K-means for learning persona identification
- **Statistical Analysis**: Correlation analysis and performance metrics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for data analysis scripts)
- OpenAI API key for AI recommendations


  

## 🤖 AI Features

### Student Analysis
- Input a student ID to get comprehensive AI-powered insights
- Cognitive skills breakdown and learning persona classification
- Personalized study strategies based on individual profiles

### Predictive Scoring
- ML model trained on cognitive skills data (R² = 0.847)
- Real-time score prediction based on input parameters
- Confidence intervals and performance insights

### Learning Personas
Four distinct learning patterns identified through K-means clustering:

1. **Balanced Achievers** (28% of students)
   - Consistent performance across all cognitive skills
   - Strong retention and well-rounded abilities

2. **High-Potential Strugglers** (23% of students)
   - Variable performance with attention challenges
   - High comprehension but needs structured support

3. **Attention-Focused Learners** (26% of students)
   - Excel in attention and focus
   - Developing comprehension skills

4. **Comprehensive Thinkers** (23% of students)
   - Exceptional comprehension and analytical skills
   - Strong retention with attention enhancement opportunities

## 📊 Data Analysis

### Machine Learning Models
- **Linear Regression**: Assessment score prediction
- **K-Means Clustering**: Learning persona identification
- **Feature Importance**: Comprehension (25%), Retention (25%), Attention (20%), Focus (20%), Engagement (10%)

### Cognitive Skills Metrics
- **Comprehension**: Reading and understanding ability
- **Attention**: Ability to focus on tasks
- **Focus**: Sustained concentration skills
- **Retention**: Memory and recall ability
- **Engagement Time**: Daily study duration

### Performance Indicators
- Assessment scores with performance categorization
- Attendance rates and study patterns
- Learning style preferences and subject interests

## 🎨 Design System

### Color Palette
- **Primary**: Emerald green (#059669) for educational trust
- **Secondary**: Light emerald (#10b981) for accents
- **Neutrals**: White, light grays, and dark gray for content
- **Charts**: Coordinated color scheme for data visualization

### Typography
- **Headings**: Geist Sans for clarity and professionalism
- **Body**: Geist Sans for excellent readability
- **Code**: Geist Mono for technical content

## 🔧 API Endpoints

### `/api/analyze-student`
- **Method**: POST
- **Purpose**: Comprehensive student analysis with AI insights
- **Input**: `{ studentId: string }`
- **Output**: Student profile, AI analysis, and persona classification

### `/api/predict-score`
- **Method**: POST
- **Purpose**: ML-based assessment score prediction
- **Input**: Cognitive skills scores and engagement time
- **Output**: Predicted score, confidence, and insights

### `/api/generate-recommendations`
- **Method**: POST
- **Purpose**: AI-powered personalized recommendations
- **Input**: Student profile and focus area
- **Output**: Tailored study strategies and improvement plans

## 📈 Usage Examples

### Analyzing a Student
1. Navigate to the Student Analysis page
2. Enter a student ID (e.g., STU001, STU002, STU003)
3. View comprehensive AI-generated insights and recommendations

### Predicting Assessment Scores
1. Go to the Predictive Scoring page
2. Adjust cognitive skill sliders or input values
3. Get real-time ML predictions with confidence intervals

### Exploring Learning Personas
1. Visit the Learning Personas page
2. Explore the four identified learning patterns
3. Review teaching strategies for each persona type

## 🛠️ Customization

### Adding New Students
Modify the mock database in `/app/api/analyze-student/route.ts` or integrate with your actual student information system.

### Updating ML Models
Run the Python analysis scripts with your data to retrain models and update coefficients in the prediction API.

### Extending AI Features
Customize the OpenAI prompts in the API routes to generate different types of insights or recommendations.

## 📚 Educational Impact

This dashboard helps educators:
- **Identify** students who need additional support
- **Understand** different learning patterns and preferences
- **Implement** data-driven teaching strategies
- **Track** student progress and cognitive development
- **Personalize** learning experiences based on AI insights





**Powered by AI** 🤖 | **Built with Next.js** ⚡ | **Designed for Education** 📚
