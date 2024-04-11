# # Import Dependencies
# import yaml
# from joblib import dump, load
# import pandas as pd
# from sklearn.model_selection import train_test_split, cross_val_score
# from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
# # Naive Bayes Approach
# from sklearn.naive_bayes import MultinomialNB
# # Trees Approach
# from sklearn.tree import DecisionTreeClassifier
# # Ensemble Approach
# from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
# import seaborn as sn
# import matplotlib.pyplot as plt
# import os
# import sys
# import numpy as np
# import json

# Get the directory path of the current Python script
# current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to config.yaml relative to the current Python script
# config_file_path = os.path.join(current_dir, 'config.yaml')


# class DiseasePrediction:
#     # Initialize and Load the Config File
#     def __init__(self, model_name=None):
#         # Load Config File
#         try:
#             with open(config_file_path, 'r') as f:
#                 self.config = yaml.safe_load(f)
#         except Exception as e:
#             print("Error reading Config file...")

#         # Verbose
#         self.verbose = self.config['verbose']
#         # Load Training Data
#         self.train_features, self.train_labels, self.train_df = self._load_train_dataset()
#         # print("TRain df: ", self.train_df)
#         # Load Test Data
#         self.test_features, self.test_labels, self.test_df = self._load_test_dataset()
#         # Feature Correlation in Training Data
#         self._feature_correlation(data_frame=self.train_df, show_fig=False)
#         # Model Definition
#         self.model_name = model_name
#         # Model Save Path
#         self.model_save_path = self.config['model_save_path']

#     # Function to Load Train Dataset
#     def _load_train_dataset(self):
#         df_train = pd.read_csv(os.path.join(current_dir, self.config['dataset']['training_data_path']))
#         cols = df_train.columns
#         # print("COls: ", cols)
#         cols = cols[:-2]
#         # print("Updated cols: ", cols)
#         train_features = df_train[cols]
#         # print("Train features: ", train_features)
#         train_labels = df_train['prognosis']

#         # Check for data sanity
#         assert (len(train_features.iloc[0]) == 132)
#         assert (len(train_labels) == train_features.shape[0])

#         if self.verbose:
#             print("Length of Training Data: ", df_train.shape)
#             print("Training Features: ", train_features.shape)
#             print("Training Labels: ", train_labels.shape)
#         return train_features, train_labels, df_train

#     # Function to Load Test Dataset
#     def _load_test_dataset(self):
#         df_test = pd.read_csv(os.path.join(current_dir, self.config['dataset']['test_data_path']))
#         cols = df_test.columns
#         cols = cols[:-1]
#         test_features = df_test[cols]
#         # print("TEST FEATURES: ", test_features)
#         # print("TYPE OF TEST FEATURES: ", type(test_features))

#         test_labels = df_test['prognosis']

#         # Check for data sanity
#         assert (len(test_features.iloc[0]) == 132)
#         assert (len(test_labels) == test_features.shape[0])

#         if self.verbose:
#             print("Length of Test Data: ", df_test.shape)
#             print("Test Features: ", test_features.shape)
#             print("Test Labels: ", test_labels.shape)
#         return test_features, test_labels, df_test

#     # Features Correlation
#     def _feature_correlation(self, data_frame=None, show_fig=False):
#         # Select only numeric columns
#         numeric_data = data_frame.select_dtypes(include='number')
        
#         # Get Feature Correlation
#         corr = numeric_data.corr(method='pearson')
#         sn.heatmap(corr, square=True, annot=False, cmap="YlGnBu")
#         plt.title("Feature Correlation")
#         plt.tight_layout()
#         if show_fig:
#             plt.show()
#         plt.savefig('feature_correlation.png')
#         # print("Feature correlation done!!")


#     # Dataset Train Validation Split
#     def _train_val_split(self):
#         X_train, X_val, y_train, y_val = train_test_split(self.train_features, self.train_labels,
#                                                           test_size=self.config['dataset']['validation_size'],
#                                                           random_state=self.config['random_state'])

#         if self.verbose:
#             print("Number of Training Features: {0}\tNumber of Training Labels: {1}".format(len(X_train), len(y_train)))
#             print("Number of Validation Features: {0}\tNumber of Validation Labels: {1}".format(len(X_val), len(y_val)))
#         return X_train, y_train, X_val, y_val

#     # Model Selection
#     def select_model(self):
#         if self.model_name == 'mnb':
#             self.clf = MultinomialNB()
#         elif self.model_name == 'decision_tree':
#             self.clf = DecisionTreeClassifier(criterion=self.config['model']['decision_tree']['criterion'])
#         elif self.model_name == 'random_forest':
#             self.clf = RandomForestClassifier(n_estimators=self.config['model']['random_forest']['n_estimators'])
#         elif self.model_name == 'gradient_boost':
#             self.clf = GradientBoostingClassifier(n_estimators=self.config['model']['gradient_boost']['n_estimators'],
#                                                   criterion=self.config['model']['gradient_boost']['criterion'])
#         # print("Model selection done!!")
#         return self.clf

#     # ML Model
#     def train_model(self):
#         # print("Model training started!!")
#         # Get the Data
#         X_train, y_train, X_val, y_val = self._train_val_split()
#         # print("X validation data: ", X_val)
#         classifier = self.select_model()
#         # Training the Model
#         classifier = classifier.fit(X_train, y_train)
#         # Trained Model Evaluation on Validation Dataset
#         confidence = classifier.score(X_val, y_val)
#         # Validation Data Prediction
#         y_pred = classifier.predict(X_val)
#         # Model Validation Accuracy
#         accuracy = accuracy_score(y_val, y_pred)
#         # Model Confusion Matrix
#         conf_mat = confusion_matrix(y_val, y_pred)
#         # Model Classification Report
#         clf_report = classification_report(y_val, y_pred)
#         # Model Cross Validation Score
#         score = cross_val_score(classifier, X_val, y_val, cv=3)

#         if self.verbose:
#             print('\nTraining Accuracy: ', confidence)
#             print('\nValidation Prediction: ', y_pred)
#             print('\nValidation Accuracy: ', accuracy)
#             print('\nValidation Confusion Matrix: \n', conf_mat)
#             print('\nCross Validation Score: \n', score)
#             print('\nClassification Report: \n', clf_report)

#         # Save Trained Model
#         dump(classifier, os.path.join(current_dir, str(self.model_save_path + self.model_name + ".joblib")))
#         # print("Model trained and dumped")

#     # Function to Make Predictions on Test Data
#     def make_prediction(self, saved_model_name=None, test_data=None, top_n=2):
#         try:
#             # Load Trained Model
#             path = os.path.join(current_dir, self.model_save_path + saved_model_name + ".joblib")
#             if self.verbose:
#                 print("PATH: ", path)
#             clf = load(path)
#         except Exception as e:
#             print("Model not found...")

#         if test_data is not None:
#             # result = clf.predict(test_data)
#             # return result
#             probabilities = clf.predict_proba(test_data)
#             # Get the indices of the top N diseases with the highest probabilities
#             top_indices = np.argsort(-probabilities, axis=1)[:, :top_n]
#             # Get the corresponding disease labels
#             top_diseases = clf.classes_[top_indices]
#             return top_diseases
#         else:
#             result = clf.predict(self.test_features)
#         accuracy = accuracy_score(self.test_labels, result)
#         clf_report = classification_report(self.test_labels, result)
#         # print("Prediction done")
#         return accuracy, clf_report

# # a function that converts symptoms in string to an array 
# def processUserInput(allSymptoms, userSymptoms):
#     entered_features_set = set(userSymptoms)
#     binary_array = [1 if feature in entered_features_set else 0 for feature in allSymptoms]
#     # Convert user_inputs to a dictionary with column names as keys
#     # print("TYPE OF BINARY ARRAY: ", type(binary_array))
#     data_dict = {symptom: values for symptom, values in zip(allSymptoms, zip(binary_array))}

#     # Convert the dictionary to a DataFrame
#     formatted_data = pd.DataFrame(data_dict)

#     # print("Formatted data:", formatted_data)
#     return formatted_data


# def main():
#     test = False
#     # Model Currently Training
#     current_model_name = 'random_forest'
#     # Instantiate the Class
#     dp = DiseasePrediction(model_name=current_model_name)
#     # Train the Model
#     dp.train_model()

#     # Get Model Performance on Test Data as a list
#     test_data = ['skin_rash','nodal_skin_eruptions','continuous_sneezing','shivering','chills','joint_pain']
    
#     if dp.verbose:
#         print("Type of test data: ", type(test_data))

#     #data from user input
#     userInput = json.loads(sys.stdin.read())
#     symptoms_list = userInput['symptoms']
    
#     if test:
#         print("Type of user Input: ", type(symptoms_list))
#         print("User Input: ", symptoms_list)
    
#     # get the symptoms as a list from test dataset features 
#     allsymptoms = list(dp.test_features.columns)
#     data = processUserInput(allsymptoms, symptoms_list)
    
        
#     if dp.verbose:
#         data = processUserInput(allsymptoms, test_data)
#         print("All symptoms: ", allsymptoms)
#         print("Data: ", data)
#         test_accuracy, classification_report = dp.make_prediction(saved_model_name=current_model_name)
#         print("Model Test Accuracy: ", test_accuracy)
#         print("Test Data Classification Report: \n", classification_report)

#     # predicted result is a numpy array 
#     predResult = dp.make_prediction(saved_model_name=current_model_name, test_data=data, top_n=5)
#     # print("PREDICTED RESULT: ", predResult)
#     response = {
#         "prediction": predResult  # Convert numpy array to list for JSON serialization
#     }
#     print(json.dumps(response))
    
#     if dp.verbose:
#         print("Response: ", response)
#         print("Executed main.py")

 


# if __name__ == "__main__":
#     try:
#         main()
#     except Exception as e:
#         # print("An error occurred: ", e)
#         response = {
#             "error": e
#         }
#         print(json.dumps(response))
#         # print("Error: ", response)


import logging
import json
import sys
import os
import pandas as pd
import numpy as np
from joblib import dump, load
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
import yaml

class DiseasePrediction:
    def __init__(self, model_name=None):
        # print("Model training started!!")
        self.config_file_path = os.path.join(os.path.dirname(__file__), 'config.yaml')
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.DEBUG)

        # Load Config File
        try:
            with open(self.config_file_path, 'r') as f:
                self.config = yaml.safe_load(f)
        except Exception as e:
            self.logger.error("Error reading Config file: %s", e)
            raise

        # Verbose
        self.verbose = self.config.get('verbose', False)

        # Load Training Data
        self.train_features, self.train_labels, self.train_df = self._load_train_dataset()

        # Load Test Data
        self.test_features, self.test_labels, self.test_df = self._load_test_dataset()

        # Feature Correlation in Training Data
        self._feature_correlation(data_frame=self.train_df, show_fig=False)

        # Model Definition
        self.model_name = model_name

        # Model Save Path
        self.model_save_path = self.config['model_save_path']

    def _load_train_dataset(self):
        # print("Loading training dataset...")
        try:
            df_train = pd.read_csv(os.path.join(os.path.dirname(__file__), self.config['dataset']['training_data_path']))
            cols = df_train.columns
            cols = cols[:-2]
            train_features = df_train[cols]
            train_labels = df_train['prognosis']

            assert len(train_features.iloc[0]) == 132
            assert len(train_labels) == train_features.shape[0]

            if self.verbose:
                self.logger.info("Length of Training Data: %s", df_train.shape)
                self.logger.info("Training Features: %s", train_features.shape)
                self.logger.info("Training Labels: %s", train_labels.shape)
            return train_features, train_labels, df_train
        except Exception as e:
            self.logger.error("Error loading training dataset: %s", e)
            raise

    def _load_test_dataset(self):
        # print("Loading test dataset...")
        try:
            df_test = pd.read_csv(os.path.join(os.path.dirname(__file__), self.config['dataset']['test_data_path']))
            cols = df_test.columns
            cols = cols[:-1]
            test_features = df_test[cols]
            test_labels = df_test['prognosis']

            assert len(test_features.iloc[0]) == 132
            assert len(test_labels) == test_features.shape[0]

            if self.verbose:
                self.logger.info("Length of Test Data: %s", df_test.shape)
                self.logger.info("Test Features: %s", test_features.shape)
                self.logger.info("Test Labels: %s", test_labels.shape)
            return test_features, test_labels, df_test
        except Exception as e:
            self.logger.error("Error loading test dataset: %s", e)
            raise

    def _feature_correlation(self, data_frame=None, show_fig=False):
        # print("Computing feature correlation...")
        try:
            numeric_data = data_frame.select_dtypes(include='number')
            corr = numeric_data.corr(method='pearson')
            sns.heatmap(corr, square=True, annot=False, cmap="YlGnBu")
            plt.title("Feature Correlation")
            plt.tight_layout()
            if show_fig:
                plt.show()
            plt.savefig('feature_correlation.png')
        except Exception as e:
            self.logger.error("Error computing feature correlation: %s", e)
            raise

    def _train_val_split(self):
        # print("Splitting train and validation dataset...")
        try:
            X_train, X_val, y_train, y_val = train_test_split(
                self.train_features, self.train_labels,
                test_size=self.config['dataset']['validation_size'],
                random_state=self.config['random_state']
            )

            if self.verbose:
                self.logger.info("Number of Training Features: %s\tNumber of Training Labels: %s", len(X_train), len(y_train))
                self.logger.info("Number of Validation Features: %s\tNumber of Validation Labels: %s", len(X_val), len(y_val))

            return X_train, y_train, X_val, y_val
        except Exception as e:
            self.logger.error("Error splitting train and validation dataset: %s", e)
            raise

    def select_model(self):
        # print("Selecting model...")
        try:
            if self.model_name == 'mnb':
                return MultinomialNB()
            elif self.model_name == 'decision_tree':
                return DecisionTreeClassifier(criterion=self.config['model']['decision_tree']['criterion'])
            elif self.model_name == 'random_forest':
                return RandomForestClassifier(n_estimators=self.config['model']['random_forest']['n_estimators'])
            elif self.model_name == 'gradient_boost':
                return GradientBoostingClassifier(
                    n_estimators=self.config['model']['gradient_boost']['n_estimators'],
                    criterion=self.config['model']['gradient_boost']['criterion']
                )
            else:
                raise ValueError("Invalid model name")
        except Exception as e:
            self.logger.error("Error selecting model: %s", e)
            raise

    def train_model(self):
        # print("Training model...")
        try:
            X_train, y_train, X_val, y_val = self._train_val_split()
            classifier = self.select_model()
            classifier = classifier.fit(X_train, y_train)

            confidence = classifier.score(X_val, y_val)
            y_pred = classifier.predict(X_val)
            accuracy = accuracy_score(y_val, y_pred)
            conf_mat = confusion_matrix(y_val, y_pred)
            clf_report = classification_report(y_val, y_pred)
            score = cross_val_score(classifier, X_val, y_val, cv=3)

            if self.verbose:
                self.logger.info('\nTraining Accuracy: %s', confidence)
                self.logger.info('\nValidation Prediction: %s', y_pred)
                self.logger.info('\nValidation Accuracy: %s', accuracy)
                self.logger.info('\nValidation Confusion Matrix: \n%s', conf_mat)
                self.logger.info('\nCross Validation Score: \n%s', score)
                self.logger.info('\nClassification Report: \n%s', clf_report)

            dump(classifier, os.path.join(os.path.dirname(__file__), f"{self.model_save_path}{self.model_name}.joblib"))
        except Exception as e:
            self.logger.error("Error training model: %s", e)
            raise

    def make_prediction(self, saved_model_name=None, test_data=None, top_n=2):
        # print("Prediction ")
        try:
            path = os.path.join(os.path.dirname(__file__), f"{self.model_save_path}{saved_model_name}.joblib")
            clf = load(path)

            if test_data is not None:
                probabilities = clf.predict_proba(test_data)
                top_indices = np.argsort(-probabilities, axis=1)[:, :top_n]
                top_diseases = clf.classes_[top_indices]
                return top_diseases
            else:
                result = clf.predict(self.test_features)
                accuracy = accuracy_score(self.test_labels, result)
                clf_report = classification_report(self.test_labels, result)
                return accuracy, clf_report
        except Exception as e:
            self.logger.error("Error making prediction: %s", e)
            raise


def process_user_input(all_symptoms, user_symptoms):
    try:
        entered_features_set = set(user_symptoms)
        binary_array = [1 if feature in entered_features_set else 0 for feature in all_symptoms]
        data_dict = {symptom: values for symptom, values in zip(all_symptoms, zip(binary_array))}
        return pd.DataFrame(data_dict)
    except Exception as e:
        logging.error("Error processing user input: %s", e)
        raise


def main():
    try:
        test = False
        current_model_name = 'random_forest'
        dp = DiseasePrediction(model_name=current_model_name)
        dp.train_model()

        if test:
            symptoms_list = ['skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain']
        else:
            user_input = json.loads(sys.stdin.read())
            # print("User input: ", user_input)
            symptoms_list = user_input['symptoms']

        all_symptoms = list(dp.test_features.columns)
        data = process_user_input(all_symptoms, symptoms_list)

        if dp.verbose:
            dp.logger.info("All symptoms: %s", all_symptoms)
            dp.logger.info("Data: %s", data)

        pred_result = dp.make_prediction(saved_model_name=current_model_name, test_data=data, top_n=5)
        # print("PREDICTED RESULT: ", pred_result)
        response = {"prediction": pred_result.tolist()}
        # print("Response: ", response)
        print(json.dumps(response))

        if dp.verbose:
            dp.logger.info("Response: %s", response)
            dp.logger.info("Executed main.py")
    except Exception as e:
        logging.error("An error occurred: %s", e)
        # print("Error: ", e)
        response = {"error": str(e)}
        print(json.dumps(response))


if __name__ == "__main__":
    main()
