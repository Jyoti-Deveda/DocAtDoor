# Import Dependencies
import yaml
from joblib import dump, load
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
# Naive Bayes Approach
from sklearn.naive_bayes import MultinomialNB
# Trees Approach
from sklearn.tree import DecisionTreeClassifier
# Ensemble Approach
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
import seaborn as sn
import matplotlib.pyplot as plt
import os
import sys
import numpy as np

# Get the directory path of the current Python script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to config.yaml relative to the current Python script
config_file_path = os.path.join(current_dir, 'config.yaml')


class DiseasePrediction:
    # Initialize and Load the Config File
    def __init__(self, model_name=None):
        # Load Config File
        try:
            with open(config_file_path, 'r') as f:
                self.config = yaml.safe_load(f)
        except Exception as e:
            print("Error reading Config file...")

        # Verbose
        self.verbose = self.config['verbose']
        # Load Training Data
        self.train_features, self.train_labels, self.train_df = self._load_train_dataset()
        # print("TRain df: ", self.train_df)
        # Load Test Data
        self.test_features, self.test_labels, self.test_df = self._load_test_dataset()
        # Feature Correlation in Training Data
        self._feature_correlation(data_frame=self.train_df, show_fig=False)
        # Model Definition
        self.model_name = model_name
        # Model Save Path
        self.model_save_path = self.config['model_save_path']

    # Function to Load Train Dataset
    def _load_train_dataset(self):
        df_train = pd.read_csv(os.path.join(current_dir, self.config['dataset']['training_data_path']))
        cols = df_train.columns
        # print("COls: ", cols)
        cols = cols[:-2]
        # print("Updated cols: ", cols)
        train_features = df_train[cols]
        # print("Train features: ", train_features)
        train_labels = df_train['prognosis']

        # Check for data sanity
        assert (len(train_features.iloc[0]) == 132)
        assert (len(train_labels) == train_features.shape[0])

        if self.verbose:
            print("Length of Training Data: ", df_train.shape)
            print("Training Features: ", train_features.shape)
            print("Training Labels: ", train_labels.shape)
        return train_features, train_labels, df_train

    # Function to Load Test Dataset
    def _load_test_dataset(self):
        df_test = pd.read_csv(os.path.join(current_dir, self.config['dataset']['test_data_path']))
        cols = df_test.columns
        cols = cols[:-1]
        test_features = df_test[cols]
        # print("TEST FEATURES: ", test_features)
        # print("TYPE OF TEST FEATURES: ", type(test_features))

        test_labels = df_test['prognosis']

        # Check for data sanity
        assert (len(test_features.iloc[0]) == 132)
        assert (len(test_labels) == test_features.shape[0])

        if self.verbose:
            print("Length of Test Data: ", df_test.shape)
            print("Test Features: ", test_features.shape)
            print("Test Labels: ", test_labels.shape)
        return test_features, test_labels, df_test

    # Features Correlation
    def _feature_correlation(self, data_frame=None, show_fig=False):
        # Select only numeric columns
        numeric_data = data_frame.select_dtypes(include='number')
        
        # Get Feature Correlation
        corr = numeric_data.corr(method='pearson')
        sn.heatmap(corr, square=True, annot=False, cmap="YlGnBu")
        plt.title("Feature Correlation")
        plt.tight_layout()
        if show_fig:
            plt.show()
        plt.savefig('feature_correlation.png')
        print("Feature correlation done!!")


    # Dataset Train Validation Split
    def _train_val_split(self):
        X_train, X_val, y_train, y_val = train_test_split(self.train_features, self.train_labels,
                                                          test_size=self.config['dataset']['validation_size'],
                                                          random_state=self.config['random_state'])

        if self.verbose:
            print("Number of Training Features: {0}\tNumber of Training Labels: {1}".format(len(X_train), len(y_train)))
            print("Number of Validation Features: {0}\tNumber of Validation Labels: {1}".format(len(X_val), len(y_val)))
        return X_train, y_train, X_val, y_val

    # Model Selection
    def select_model(self):
        if self.model_name == 'mnb':
            self.clf = MultinomialNB()
        elif self.model_name == 'decision_tree':
            self.clf = DecisionTreeClassifier(criterion=self.config['model']['decision_tree']['criterion'])
        elif self.model_name == 'random_forest':
            self.clf = RandomForestClassifier(n_estimators=self.config['model']['random_forest']['n_estimators'])
        elif self.model_name == 'gradient_boost':
            self.clf = GradientBoostingClassifier(n_estimators=self.config['model']['gradient_boost']['n_estimators'],
                                                  criterion=self.config['model']['gradient_boost']['criterion'])
        print("Model selection done!!")
        return self.clf

    # ML Model
    def train_model(self):
        # print("Model training started!!")
        # Get the Data
        X_train, y_train, X_val, y_val = self._train_val_split()
        # print("X validation data: ", X_val)
        classifier = self.select_model()
        # Training the Model
        classifier = classifier.fit(X_train, y_train)
        # Trained Model Evaluation on Validation Dataset
        confidence = classifier.score(X_val, y_val)
        # Validation Data Prediction
        y_pred = classifier.predict(X_val)
        # Model Validation Accuracy
        accuracy = accuracy_score(y_val, y_pred)
        # Model Confusion Matrix
        conf_mat = confusion_matrix(y_val, y_pred)
        # Model Classification Report
        clf_report = classification_report(y_val, y_pred)
        # Model Cross Validation Score
        score = cross_val_score(classifier, X_val, y_val, cv=3)

        if self.verbose:
            print('\nTraining Accuracy: ', confidence)
            print('\nValidation Prediction: ', y_pred)
            print('\nValidation Accuracy: ', accuracy)
            print('\nValidation Confusion Matrix: \n', conf_mat)
            print('\nCross Validation Score: \n', score)
            print('\nClassification Report: \n', clf_report)

        # Save Trained Model
        dump(classifier, os.path.join(current_dir, str(self.model_save_path + self.model_name + ".joblib")))
        print("Model trained and dumped")

    # Function to Make Predictions on Test Data
    def make_prediction(self, saved_model_name=None, test_data=None):
        try:
            # Load Trained Model
            path = os.path.join(current_dir, self.model_save_path + saved_model_name + ".joblib")
            if self.verbose:
                print("PATH: ", path)
            clf = load(path)
        except Exception as e:
            print("Model not found...")

        if test_data is not None:
            result = clf.predict(test_data)
            return result
        else:
            result = clf.predict(self.test_features)
        accuracy = accuracy_score(self.test_labels, result)
        clf_report = classification_report(self.test_labels, result)
        print("Prediction done")
        return accuracy, clf_report

# a function that converts symptoms in string to an array 
def processUserInput(allSymptoms, userSymptoms):
    entered_features_set = set(userSymptoms)
    binary_array = [1 if feature in entered_features_set else 0 for feature in allSymptoms]
    # Convert user_inputs to a dictionary with column names as keys
    # print("TYPE OF BINARY ARRAY: ", type(binary_array))
    data_dict = {symptom: values for symptom, values in zip(allSymptoms, zip(binary_array))}

    # Convert the dictionary to a DataFrame
    formatted_data = pd.DataFrame(data_dict)

    # print("Formatted data:", formatted_data)
    return formatted_data


def main():
    # Model Currently Training
    current_model_name = 'random_forest'
    # Instantiate the Class
    dp = DiseasePrediction(model_name=current_model_name)
    # Train the Model
    dp.train_model()
    # Get Model Performance on Test Data as a list
    test_data = ['skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain']
    # print("Type of test data: ", type(test_data))
    
    # get the symptoms as a list from test dataset features 
    allsymptoms = list(dp.test_features.columns)
    # print("All symptoms: ", allsymptoms)
    data = processUserInput(allsymptoms, test_data)
    if dp.verbose:
        print("Data: ", data)
    # userInput = sys.stdin.read()
    # print("User Input: ", userInput)
    # test_accuracy, classification_report = dp.make_prediction(saved_model_name=current_model_name)

    # predicted result is a numpy array 
    predResult = dp.make_prediction(saved_model_name=current_model_name, test_data=data)
    print("PREDICTED RESULT: ", predResult)
    
    # print("TYPE OF PREDICTED RESULT: ", type(predResult))
    # print("Model Test Accuracy: ", test_accuracy)
    # print("Test Data Classification Report: \n", classification_report)
    print("Executed main.py")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("An error occurred: ", e)

