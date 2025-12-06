package scouting

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestScout(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.String() == "VALID URL" {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(`Expected Return Value`))
		}
		if r.URL.String() == "INVALID URL" {
			w.WriteHeader(http.StatusNotFound)
		}
	}))

	type args struct {
		location  string
		objective string
	}
	tests := []struct {
		name    string
		args    args
		want    bool
		wantErr bool
	}{
		{"Test Found Objective", args{server.URL, "Expected Return Value"}, true, false},
		{"Test Did Not Find Objective", args{server.URL, "Not Expected Value"}, false, false},
	}

	defer server.Close()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Scout(tt.args.location, tt.args.objective)
			if (err != nil) != tt.wantErr {
				t.Errorf("Scout() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("Scout() = %v, want %v", got, tt.want)
			}
		})
	}
}
