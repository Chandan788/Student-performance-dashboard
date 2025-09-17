import pandas as pd
import numpy as np
import json
from datetime import datetime, timedelta
import random

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

print("📊 Generating Enhanced Student Dataset")
print("=" * 40)

# Enhanced student dataset with more realistic data
n_students = 200

# Generate diverse student names
first_names = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
    'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
    'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Jacob', 'Sofia', 'Logan', 'Avery', 'Jackson',
    'Ella', 'Levi', 'Madison', 'Sebastian', 'Scarlett', 'Mateo', 'Victoria', 'Jack', 'Aria', 'Owen',
    'Grace', 'Theodore', 'Chloe', 'Aiden', 'Camila', 'Samuel', 'Penelope', 'Joseph', 'Riley', 'John',
    'Layla', 'David', 'Lillian', 'Wyatt', 'Nora', 'Matthew', 'Zoey', 'Luke', 'Mila', 'Asher',
    'Aubrey', 'Carter', 'Hannah', 'Julian', 'Lily', 'Grayson', 'Addison', 'Leo', 'Eleanor', 'Jayden',
    'Natalie', 'Gabriel', 'Luna', 'Isaac', 'Savannah', 'Oliver', 'Brooklyn', 'Jonathan', 'Leah', 'Ezra',
    'Zoe', 'Thomas', 'Stella', 'Charles', 'Hazel', 'Christopher', 'Ellie', 'Jaxon', 'Paisley', 'Maverick'
]

last_names = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
]

# Generate student data with realistic correlations
student_data = []

for i in range(n_students):
    # Generate base cognitive abilities with some correlation
    base_ability = np.random.normal(75, 12)
    
    # Generate correlated cognitive skills
    comprehension = np.clip(np.random.normal(base_ability + np.random.normal(0, 8), 10), 0, 100)
    attention = np.clip(np.random.normal(base_ability + np.random.normal(-5, 10), 12), 0, 100)
    focus = np.clip(np.random.normal(attention + np.random.normal(2, 8), 10), 0, 100)
    retention = np.clip(np.random.normal(comprehension + np.random.normal(-3, 9), 11), 0, 100)
    
    # Generate engagement time based on attention and focus
    engagement_base = (attention + focus) / 2
    engagement_time = np.clip(np.random.normal(engagement_base * 0.6 + 15, 8), 10, 90)
    
    # Generate assessment score with realistic correlations
    assessment_score = np.clip(
        0.25 * comprehension + 
        0.20 * attention + 
        0.20 * focus + 
        0.25 * retention + 
        0.10 * engagement_time + 
        np.random.normal(0, 6), 
        0, 100
    )
    
    # Generate additional metrics
    study_hours_per_week = np.clip(np.random.normal(engagement_time * 0.15 + 5, 3), 2, 25)
    attendance_rate = np.clip(np.random.normal(85 + (assessment_score - 70) * 0.3, 8), 60, 100)
    
    # Generate learning style preference
    learning_styles = ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing']
    learning_style = np.random.choice(learning_styles)
    
    # Generate subject preferences based on cognitive profile
    if comprehension > 80:
        preferred_subjects = ['Mathematics', 'Science', 'Literature']
    elif attention > 75:
        preferred_subjects = ['Art', 'Music', 'Physical Education']
    else:
        preferred_subjects = ['History', 'Social Studies', 'Languages']
    
    student = {
        'student_id': f'STU{str(i+1).zfill(3)}',
        'name': f"{random.choice(first_names)} {random.choice(last_names)}",
        'class': np.random.choice(['9A', '9B', '10A', '10B', '10C', '11A', '11B', '11C', '12A', '12B'], p=[0.1, 0.1, 0.15, 0.15, 0.15, 0.1, 0.1, 0.1, 0.025, 0.025]),
        'age': 14 + int(student['class'][0:2]) - 9 + np.random.randint(-1, 2),
        'comprehension': round(comprehension, 1),
        'attention': round(attention, 1),
        'focus': round(focus, 1),
        'retention': round(retention, 1),
        'assessment_score': round(assessment_score, 1),
        'engagement_time': round(engagement_time, 1),
        'study_hours_per_week': round(study_hours_per_week, 1),
        'attendance_rate': round(attendance_rate, 1),
        'learning_style': learning_style,
        'preferred_subject': np.random.choice(preferred_subjects),
        'last_assessment_date': (datetime.now() - timedelta(days=np.random.randint(1, 30))).strftime('%Y-%m-%d'),
        'improvement_areas': [],
        'strengths': []
    }
    
    # Determine strengths and improvement areas
    skills = {
        'comprehension': student['comprehension'],
        'attention': student['attention'], 
        'focus': student['focus'],
        'retention': student['retention']
    }
    
    # Find top 2 skills as strengths
    sorted_skills = sorted(skills.items(), key=lambda x: x[1], reverse=True)
    student['strengths'] = [skill[0].title() for skill in sorted_skills[:2]]
    
    # Find bottom 2 skills as improvement areas
    student['improvement_areas'] = [skill[0].title() for skill in sorted_skills[-2:]]
    
    student_data.append(student)

# Create DataFrame
df = pd.DataFrame(student_data)

print(f"✅ Generated {len(df)} student records")
print(f"📚 Classes: {sorted(df['class'].unique())}")
print(f"🎯 Age range: {df['age'].min()}-{df['age'].max()}")
print(f"📊 Learning styles: {df['learning_style'].value_counts().to_dict()}")

# Display sample statistics
print("\n📈 Dataset Statistics:")
cognitive_skills = ['comprehension', 'attention', 'focus', 'retention', 'assessment_score']
print(df[cognitive_skills].describe().round(2))

# Save the enhanced dataset
df.to_json('enhanced_student_data.json', orient='records', indent=2)
df.to_csv('enhanced_student_data.csv', index=False)

print(f"\n💾 Dataset saved as:")
print(f"  - enhanced_student_data.json ({len(df)} records)")
print(f"  - enhanced_student_data.csv ({len(df)} records)")

# Generate summary statistics for dashboard
summary_stats = {
    'total_students': len(df),
    'average_assessment_score': round(df['assessment_score'].mean(), 1),
    'average_engagement_time': round(df['engagement_time'].mean(), 1),
    'average_attendance_rate': round(df['attendance_rate'].mean(), 1),
    'cognitive_skills_avg': {
        'comprehension': round(df['comprehension'].mean(), 1),
        'attention': round(df['attention'].mean(), 1),
        'focus': round(df['focus'].mean(), 1),
        'retention': round(df['retention'].mean(), 1)
    },
    'class_distribution': df['class'].value_counts().to_dict(),
    'learning_style_distribution': df['learning_style'].value_counts().to_dict(),
    'top_performing_students': df.nlargest(10, 'assessment_score')[['student_id', 'name', 'assessment_score']].to_dict('records'),
    'students_needing_support': df.nsmallest(10, 'assessment_score')[['student_id', 'name', 'assessment_score']].to_dict('records')
}

with open('dashboard_summary.json', 'w') as f:
    json.dump(summary_stats, f, indent=2)

print(f"  - dashboard_summary.json (summary statistics)")
print("\n🎉 Enhanced dataset generation complete!")
